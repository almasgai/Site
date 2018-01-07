---
title: "RC Car"
date: 2018-01-04T13:32:28-05:00
draft: false
tags: ["arduino", "android","2018"]
---
# Building an Arduino-powered Car for CSC 315

This semester I took a class that I have wanted to take since my first
semester at college: CSC 315, Software Engineering. CSC 315 focuses more on
the practical side of computer science as opposed to the theoretical stuff like data structures and algorithms. The first half of the semester was
learning about software engineering approaches, how to work with teams when developing software, and computer ethics.
The second half of the semester was more hands-on. The  objective of the second half
is to pitch an idea to my professor on a project or idea that my group and I would
like to pursue. Once given the green light, the group is given the rest of the semester
to complete their idea.

## Choosing one idea

The hardest part for me was choosing an idea because there were about five different projects I wanted to embark on. Since my group and had to commit idea for an entire
semester, we made sure to choose something that was 1) challenging 2) realistic,
and 3) seemed like a lot of fun. We were not allowed to choose our groups and I was
with 3 other people I had never spoken to. This was not a problem though because
we all gave honest feedback to each other and pulled our own weight in the project based on our strengths.

We all sat down and discussed our top ideas to each other. Luckily for me, the
two final ideas that we came to were both mine: a fully functioning e-commerce
website or an RC car. You can probably guess which idea we pursued. 😉

## Assigning Roles & Responsibilities

We came across a nontechnical issue quickly during our first meeting. Two of four members of our group were
commuters and were only on campus Tuesday and Thursday. This meant that most of
the work would be done via my team's GitList and communication limited to messaging
for the most part. We held each other accountable by ending each team meeting on days we could all meet by stating what we would each do in the next sprint.
It also helped that we had to explain in front of our classmates and the professor
what exactly we individually accomplished and what our next move was every Tuesday.

We divided our workload based on our skills and expertise. I was given the task
with one other member of creating a simple but functional Android app to send
ASCII characters via Bluetooth over to be read by the car and make a decision based
on the information sent over. For example, pressing a button would send 'L' over
to the car. This would result in the car interpreting the character and turning left. I also helped with the wiring
between the HC-06, the motor shield, the Arduino 2560, and the motor. Troubleshooting the connections between the Arduino, Bluetooth module, and motor shield helped me understand electronics immensely. It
is one thing to read about it online through guides on [electricity] and [Arduinos]
like I did and a completely different experience doing it hands on. Although things
didn't click at first, I  now have a strong understanding of the basics of
circuits and embedded systems. This will come handy in future Arduino-based projects
that I will do and for a course I'm taking next semester called the Internet of Things.

I was also the group leader because it was originally my idea. This meant that I would do my fair
share of the work but also do a lot of the tedious and administrative work as well.
I was held responsible for keeping minutes during group meetings and reporting to
my professor to keep him in the loop of things. It also meant that I made sure everyone
was doing their work which admittedly was pretty easy since everyone in my group
was amicable and hard working.

## Pitfalls & Obstacles

Everyone in my group came across inevitable setbacks and bugs that hindered progress in
one way or another. In my case, I had a lot of learning to do to become comfortable
with Arduinos because I never used them before. I had to make sure that I had correct wiring so
I don't blow out any important parts. This was stressful because we only had one Bluetooth
module. If I passed too much electricity through it I potentially could have fried it.
(Surprisingly, only two LED lights blew out when I was testing out wiring 😃).
This would mean that we would have to order another one online and wait until it came. After
setting up some pretty gnarly wiring (see images below) between the HC-06 and MEGA 2560, I had an ugly
but working set up to test my app on.

...Except my app would not work. Interestingly enough, I was able to connect to any
other Bluetooth device _besides_ my module. When trying to connect with the HC-06, my
app would say paired by not connected. After a few hours (a few more than I would
like to admit) I discovered that I was using the wrong UUID (universally unique identifier) and jumbled up the TX and RX connections between the HC-06 and MEGA 2560.
After switching to the UUID designated for embedded systems found on the official Android
developers [Bluetooth documentation page](https://developer.android.com/reference/android/bluetooth/BluetoothDevice.html) and following [this tutorial,](https://www.youtube.com/watch?v=y8R2C86BIUc&list=PLgCYzUzKIBE8KHMzpp6JITZ2JxTgWqDH2)
I was able to send data over to the Arduino and see it via the serial monitor in the Arduino IDE.


## Pivoting our Product

This took way longer than anticipated and time was running out of the semester so
my team and I had to work diligently. Initially my team and I wanted to make the car
fully autonomous via the [Google Maps API](https://developers.google.com/maps/documentation/directions/intro)
or through preinstalled instructions (turn left after driving 30 meters) but the time
constraint restricted us to create a basic model.

We were able to make the car semi-autonomous by adding 2 IR sensors to the front on the
sides and an ultrasonic sensor in the middle to detect obstacles. This allowed the car
to stop itself from running into an obstacle and consequently back up and either go
left or right based on whether of not there are obstacles in either the left or right.
Unfortunately, we had to give all the project parts back to our professor after the semester ended.
I still want to make a car fully autonomous so I might just buy all the necessary
parts again in the future and do it on my own time next semester.


## The Big Day: Presenting

My group and I finally presented our car. Instead of using batteries like we initially planned,
we decided to power the Arduino unit via a cable connected to a laptop while the
motors ran on batteries. We chose to do this because there was an uneven
weight distribution that caused the car to drag in the back and lift the front off
the ground which disrupted driving. Overall the presentation went smoother than
I had anticipated.

We did have a few hiccups though. For example, the actual demonstration was awkward since one of my team members had to carry his laptop plugged into the car.
I suspect this consequently led to an issue: after about 10 minutes, the Bluetooth module
would turn off and leave me, who was controlling the car, disconnected. After doing some research, I think the problem
was that the laptop did not provide enough power to the Arduino which controlled the HC-06.
This caused the HC-06 to die out on us occasionally. I believe both problems could have
been solved if we added another chassis on top of the first. Adding an additional
level would have created more surface area so that we could add another battery pack
to power the Arduino sufficiently and move the components of the vehicle around more freely to distribute
the weight evenly.

Overall I learned a lot about electronics and Arduinos through this project, both through the
hardware aspect of wiring and through the Arduino programming language which is really just C++. I am
also very comfortable with Android app development now. Although I struggled a lot
in this project, especially getting the app to communicate with the Bluetooth module,
I learned a lot about software engineering and electronics. I can't wait to take
Internet of Things next semester, a class where we focus on embedded systems and
tiny computers like the Raspberry Pi.

## Pictures & Parts

- [Elegoo MEGA 2560](https://www.amazon.com/Board-ATmega2560-ATMEGA16U2-Compatible-Arduino/dp/B01H4ZDYCE/ref=sr_1_2?ie=UTF8&qid=1515287436&sr=8-2&keywords=2560)

- [Motor Shield](https://www.amazon.com/DROK-Controller-H-Bridge-Mega2560-Duemilanove/dp/B00CAG6GX2/ref=sr_1_6?s=industrial&ie=UTF8&qid=1515287469&sr=1-6&keywords=motor+arduino)

- [Breadboard](https://www.amazon.com/eBoot-Experiment-Solderless-Breadboard-400-Points/dp/B01MG5IPUX/ref=sr_1_5?s=industrial&ie=UTF8&qid=1515287539&sr=1-5&keywords=breadboard)

- [Motor & Wheels](https://www.amazon.com/DIYmall-Motor-Geared-Magnetic-Gearbox/dp/B07671HCDZ/ref=sr_1_1?s=industrial&ie=UTF8&qid=1515287596&sr=1-1&keywords=motor+arduino+wheels)

- [Jumper Wires](https://www.amazon.com/Haitronic-Multicolored-Breadboard-Arduino-raspberry/dp/B01LZF1ZSZ/ref=sr_1_3?s=industrial&ie=UTF8&qid=1515287646&sr=1-3&keywords=jumper+wires)

- [Frame & Battery Holder](https://www.amazon.com/DealMux-Motor-Chassis-Encoder-Arduino/dp/B01F0T3I8G/ref=sr_1_2?s=industrial&ie=UTF8&qid=1515287687&sr=8-2&keywords=arduino+car+chasis)

- [HC-05 (Works just like the HC-06 I used)](https://www.amazon.com/dp/B01MQKX7VP/ref=asc_df_B01MQKX7VP5327491/?tag=hyprod-20&creative=395033&creativeASIN=B01MQKX7VP&linkCode=df0&hvadid=167146065113&hvpos=1o1&hvnetw=g&hvrand=8096617673536435054&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9007186&hvtargid=pla-362748457327)

- [Distance Sensor Sonar](https://www.amazon.com/SainSmart-HC-SR04-Ranging-Detector-Distance/dp/B004U8TOE6/ref=sr_1_13?s=electronics&ie=UTF8&qid=1515287849&sr=1-13&keywords=distance+sensor)

- [IR Distance Sensors](https://www.amazon.com/OSOYOO-Infrared-Obstacle-Avoidance-Arduino/dp/B01I57HIJ0/ref=sr_1_3?s=electronics&ie=UTF8&qid=1515287890&sr=1-3&keywords=ir+distance)

![Image 1](/images/RC/1.png)
![Image 2](/images/RC/2.png)
![Image 4](/images/RC/4.jpg)
![Image 5](/images/RC/5.jpg)
![Image 6](/images/RC/6.jpg)
![Image 7](/images/RC/7.jpg)
![Image 8](/images/RC/8.jpg)
![Image 9](/images/RC/9.jpg)
