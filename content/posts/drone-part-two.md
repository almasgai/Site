---
title: "Drone Part Two"
date: 2021-04-28T02:15:37-04:00
draft: false
tags: []
---

# Source Code for Drone

Part one of the drone covers most of the non-technical details. In this part, I'll talk about the technical
details of the project.

### Project Structure

I broke the project into four directories: `labels`, `model`, `src`, and `tests`.

`model` and `labels` are a bit self-explanatory. TensorFlow reads in a model from `model`
and a label set from `labels`.

Most of the project started in `tests` where I would write simple programs to test the GPIO buttons to make sure
I could interact with the Pi while it was attached to the drone. I also based the main loop after this example from [Google's TensorFlow Lite Github](https://github.com/tensorflow/examples/tree/master/lite/examples/object_detection/raspberry_pi) which was extremely helpful in creating this project. The `src` directory is mainly what this blog post will focus on.

Theses are the files in the `src`. `detect_picamera.py` is a modified version of the TensorFlow Lite example from above.

- `run.sh`
- `detect_picamera.py`
- `logger.py`
- `args.py`
- `sms.py`

`run.sh` allows the Pi to run real time object detection automatically when it boots up. You add it to your rc.local file and pass arguments to `detect_picamera.py` to fit your needs though the defaults are reasonable. Run `python3 picamera_detect.py --help` to see a whole list of arguments you can pass. Alternatively you can just look at the source code for `args.py` to see all the options. In order for `run.sh` to work you need to `cd` into the directory that contains `run.sh`. In my case `/home/pi/Drone/src/`, so I then activated the Python environment `venv` and then ran `python3 detect_picamera.py &`. It should look something like this:
`rc.local` (`cd` into `src` directory and execute `run.sh` which basically activates the `venv` environment):

```
cd /home/pi/Drone/src
./run.sh
```

`run.sh`:

```
. ../venv/bin/activate
python3 detect_picamera.py &
exit
```

Next is the main loop of the program: `detect_picamera.py`. The loop uses the PiCamera to look for objects in real time. I removed a great deal of code and added my own to fit my needs for the project. For example,
originally `detect_picamera.py` included a few methods that would create a GUI that would draw a square around an object and try and label that square in real time. Since I didn't need a GUI, I completely removed
this code.

Next I altered the code to search for people. Since the program searched for a wide array of objects ranging from umbrellas to dogs to parking meters and everything in between, I added some code to specifically log the GPS coordinates and send a text message only when a person is detected.

Next I added imported my arguments from `args.py` to make the program more flexible. You can pass `args.py` your own model, label, detection threshold, height and width resolution, and pin numbers for start, stop, and kill. I also used a great library called `gpiozero` so that I could control the Pi using three buttons to 1) start detecting objects 2) stop detecting objects and 3) end the program. I also used a program called `flite` to speak text back to me. This was useful to ensure that when I pressed one of the three buttons, the Pi would speak back to me affirming my actions ("Searching...", "Stopping camera", and "Killing process now").

Lastly there `logger.py` and `sms.py` which go hand in hand. `sms.py` contains a class called `SMS` which reads in Twilio credentials passed in as environment variables for its `__init__` method. It's only other method sends a text message with GPS coordinates that are passed to it from `detect_picamera.py`. `logger.py` connects to the SIM7600 via `pyserial`, sends it an AT command to request the GPS location, and logs the GPS coordinates if they have not already been recorded as a pair. The logging sleeps for about 5 seconds thereafter to help ensure that if there are other people logged, they are further away from the previous spot. Logger sanitizes the input and stores the GPS coordinates as longtitude and latitude variables that are added to the sets `longitude_history` and `latitude_history` respectively. The log file is recorded as `<timestamp>.txt` in the directory called `logs`.
