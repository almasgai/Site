---
title: "Why I Will Never Miss an 8 am Ever Again"
date: 2018-03-01T14:10:27-05:00
draft: true
tags: ["arduino", "DIY"]
---
# Solving a Common College Student Problem
Like most people, I enjoy sleep. A lot. Maybe too much. Waking up early in the
morning is a herculean task since I'm a heavy sleeper. But I'm also taking an 8am
class this semester and don't want to sleep in. I decided that between my knowledge on
programming and electronics, I could somehow solve my problem.

I had my 'eureka' moment about two weeks ago while watching a [YouTube video](https://www.youtube.com/watch?v=qlMtakaa7u8)
on creating flexible LED panels. I thought that waking up would be easier if
I could turn on a light panel above my bed in the morning. And this is where my
quest to making waking up earlier easier.

## Parts List
Below are all the parts I used, most of which are similar to what you can find
in the video

- [LED Light Strip](https://www.amazon.com/gp/product/B00HSF64JG/ref=oh_aui_detailpage_o07_s01?ie=UTF8&psc=1): Personally I chose to use 'warm' white to emulate natural
sunlight
- [Fake Leather](https://www.amazon.com/gp/product/B00JLPQKFO/ref=oh_aui_detailpage_o05_s00?ie=UTF8&psc=1): Used this as the panel since pleather is flexible, strong, and most
importantly cheap!
- [Power Source](https://www.amazon.com/Adapter-Arduino-Tbuymax-Listed-Positive/dp/B06Y1LF8T5/ref=sr_1_3?ie=UTF8&qid=1519933043&sr=8-3&keywords=arduino+power+supply&dpID=51%252BmVpNs4eL&preST=_SY300_QL70_&dpSrc=srch): Used to power the Arduino and light panel.
- [MOSFET](https://www.amazon.com/gp/product/B00CHTLAIS/ref=oh_aui_detailpage_o01_s01?ie=UTF8&psc=1): Used to control the 12V LED lights. Using this allows the Arduino to pump
out more electricity to the lights without frying the Arduino board when using a
12V power supply. The LED lights still work using at 75% power using the power
supply above. I used the power supply listed above because was something that I
already had in my room and was satified with how bright it was.
- [Aluminum Wire](https://www.amazon.com/gp/product/B01B0Y06SA/ref=oh_aui_detailpage_o02_s05?ie=UTF8&psc=1):
This is used to help the panel maintain its form. The wires are easy to bend, but
hard to break. Perfect for the panel.

Miscellaneous parts that most electronic enthusiasts already have:

- Soldering Iron
- Solder Wire
- Red(+) & Black(-) Wire
- Wire Cutter
- Smoke Fan with Carbon Filter
- Hot Glue Gun

After gathering all the parts, I got down to work!

## First Things First
I wanted to make my panel rectangular so that when the light shines at 7 in the
morning, it would cover my entire field of vision and (hopefully) wake up. I
decided to make each strip 18 LED lights long. I then cut pleather to make a
lightweight, flexible panel panel.

It wasn't too long until I hit my first roadblock,
which was soldering. I found the culprit, or should I say culprits. The first problem
was I placed the LED light strips too close together. The second issue was the
red and black wiring was too stiff and wouldn't stay bent since the I was bending
them too sharply. This caused the thick wires to literally rip the soldering wire
off of the LED light panels.

I rearranged space between the strips so that 1) soldering the wires together
became much easier, 2) bending the positive and negative wires wouldn't be under
enough stress to rip the metal off the strips again and 3) to provide a larger area
of light output.

## Let There Be Light!
I held my breath while I plugged the power supply into the socket... and it worked!
Or at least the first three rows. The positive and negative wires were soldered
together on the fourth row by accident that cut the circuit short. Whoops. After
resoldering, everything worked perfectly.

My next step was to add the aluminum wire to the panel. This would allow the
flimsy panel to hold its form when manipulating it. This was accomplished by
cutting the wire slightly shorted than the perimeter of the panel. I then used
a hot glue gun to make the wiring stay put. Lastly, I folded the fake leather
over aluminum wire so that it was hidden. Again, I used a hot glue gun to keep
this leather down so that the wiring would remain concealed.

I then made slits where the strips ended on the opposite end of where the
soldering was done. This helped hide where the positive and negative ends were
exposed. I also made a small cut where the power adapter was and threaded the
power adapter through the hole so that it would remain hidden from the front view.

After testing out the lights one last time to ensure that everything was working,
I switched over to the software side of things.

## A Simple Microcontroller for a Simple Task: Arduino Uno
Keeping my costs down was my number one priority. Originally, I thougt about using
an STM32 but I already had a spare Arduino Uno laying around so I thought it was
about time putting it to use. I had an Arduino Mega2560 as well but thought it
would be a little bit overkill since has more I/O pins than I know what to do with
and has more horsepower needed for this particular project, so I settled with the

Programming it was straightforward. I needed to get acquainted with two libraries:
[TimeLib](https://github.com/PaulStoffregen/Time) & [TimeAlarms](https://github.com/PaulStoffregen/TimeAlarms). TimeLib is used for timekeeping functionality, which would
help me keep track of the time that has passed between each day. TimeAlarms would
allow the Arduino to do a specific task based on what time it is. The documentation
for each respective library was straightforward and easy to follow. Along with
[Adafruit's guide on LED strips](https://learn.adafruit.com/rgb-led-strips?view=all),
I was able to write up a relatively simple program below:

```Arduino
#include <TimeLib.h>
#include <TimeAlarms.h>

#define PIN 10            // control pin
#define DELAY 10          // 20ms internal delay; increase for slower fades

int long countDown = 1800 * 1000;

void setup() {

  pinMode(PIN, OUTPUT);

  // Setting time format (24 hour):
  // HOUR, MINS, SECS, MONTH, DAY, YEAR (20XX)
  setTime(00, 13, 00, 3, 1, 18);

  // Setting up when the alarm should go off
  Alarm.alarmRepeat(6, 45, 00, fade);


}

void loop() {
  Alarm.delay(1000); // wait one second between clock display
}

void fade() {

while(countDown != 0){

  delay(1000);
    // fade in
    for(int i=0; i< 255; i++) {
      analogWrite(PIN, i);
      delay(DELAY);
    }

    // fade out
    for(int i=0; i< 255; i++) {
      analogWrite(PIN, 255 - i);
      delay(DELAY);
    }

    countDown -= 5000;
  }

  countDown = 2700 * 1000;
  analogWrite(PIN, LOW);
}
```

## Piecing Things Together
My next step was bringing the project together.
