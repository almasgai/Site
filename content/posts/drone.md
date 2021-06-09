---
title: "Drone"
date: 2021-04-27T15:41:47-04:00
draft: false
tags: []
---

# A Pi that Flies

Something I never bothered writing about on my blog was my senior design project. Part of this is because I never found the time to write and eventually forgot to write it. The other part is because drones were prohibited on campus until [after I graduated](https://sites.sju.edu/communitystandards/files/2020/08/2020-2021_STUDENT-HANDBOOK_Jan2021.pdf). Plus I was an RA so it looked bad if I was breaking the rules I should be enforcing. In this blog post I'll talk about the original drone design and my changes the second time I did it based on the new skills I've acquired. I'm recalling most of this project from memory so if anything is unclear, please let me know.

### The short version:

_This ended up being a long post so if you only want a quick summary here it is: I decided for my senior design to assemble a first responder drone and make it 'smart' by attaching a Raspberry Pi to it. The drone
would 'look' for people using a web cam and then interpret the frames using TensorFlow and MobileNet model. If a person is detected, it would log the result to a text file and send a text message using Twilio. Part two talks about the technical details more._

_You can find the source code [here](https://github.com/almasgai/Drone)._

---

### CSC 495

CSC 495 was a class I looked forward to since I was a freshman. I remember each year eagerly watching each senior class present their projects. Most of the projects were websites or apps. Some of my favorite were an app that synchronizes with other phones and plays music simultaneously similar to how Sonos speakers work and an app that was basically Uber for the campus vans.

But the majority of projects seemed like the same CRUD app or website so I wanted to do
something different. By the time I was a senior I was familiar with basic electronics and
even built a few projects, [like my alarm clock for 8ams.](http://masgai.com/posts/wula-alarm/). I knew I wanted to do something along those lines so I chose to build a drone.

I had never flown a drone up until that point and didn't even know where to begin. Do I
order a complete set or do I pick out individual components? Since I was a college student at the time with very limited money, I found out it would be cheaper to order
the parts separately. Plus I needed a large lipo battery to power both the drone and the Raspberry Pi and most kits on Amazon wouldn't suffice.

### Defining the Project

Another problem I had was actually _defining_ my project. Did I want to write the firmware from scratch and use an Arduino / Teensy as the flight controller? Did I want
to create a drone that focused solely on recording video during flights? Or something else? The problem is that these things have already been done so I wouldn't be original if I had recreated them. My goal was to create something valuable and original. Based on my time constraint and skillset, I decided I would make a smart drone by leveraging TensorFlow and Twilio. The drone would fly around like any other drone but have a Raspberry Pi and web cam attached to it. If a human was detected, it would log the GPS coordinates and send a text message to my phone. Once I was approved, I started researching drone parts. I did this by reading [a](https://www.amazon.com/Building-Smart-Drones-ESP8266-Arduino/dp/1788477510/ref=sr_1_2?dchild=1&keywords=drone+arduino+book&qid=1620749437&sr=8-2) [few](https://www.amazon.com/DIY-Drones-Evil-Genius-Customize/dp/1259861465/ref=sr_1_17?dchild=1&keywords=drone+book&qid=1620749408&sr=8-17) [books](https://www.amazon.com/Make-Drones-Teach-Arduino-Fly/dp/1680451715/ref=sr_1_3?dchild=1&keywords=drone+arduino+book&qid=1620749437&sr=8-3).

### Getting the Parts

Something I didn't anticipate was how long it would take to learn all the intricate details of a drone. Similar to building a PC, all drones require a lot of parts that are necessary to make them fly. The problems is, some parts are incompatible with other
parts. I didn't know this when starting out. There isn't something like [PC Part Picker](https://pcpartpicker.com/) for drone
parts so I had to be really careful when getting parts. Since there weren't any stores nearby that sold drone parts, I had to order all the parts online so if something was incompatible with the rest of the parts, I would be unable to make any sort of progress for at least a few days while I waited for the right part to come. This alone made the project very stressful.

One time I bought [propellers](https://www.amazon.com/gp/product/B01CJMJ886/ref=ppx_yo_dt_b_asin_title_o05_s00?ie=UTF8&psc=1) on Amazon but when they arrived I realized they didn't work with my [brushless motors](https://www.amazon.com/gp/product/B075DD16LK/ref=ppx_yo_dt_b_asin_title_o05_s00?ie=UTF8&psc=1). The problem was the brushless motors required DJI's proprietary self tightening propellers so my generic ones weren't compatible. I ended up buying the right ones later.

Another issue was finding a transmitter that worked with the [APM 2.8 flight controller](https://www.amazon.com/gp/product/B07MD3ZRKJ/ref=ppx_yo_dt_b_asin_title_o08_s01?ie=UTF8&psc=1). I originally bought a really [cheap drone](https://www.amazon.com/Holy-Stone-Quadcopter-Batteries-Adjustment/dp/B085HKVRVV/ref=sr_1_28?dchild=1&keywords=drone&qid=1619581998&refinements=p_36%3A1253560011&rnid=386491011&s=toys-and-games&sr=1-28) and tried to use the transmitter with my flight controller but it didn't recognize it. (I believe the transmitter was 'locked' to the cheap drone so I had to buy a transmitter that
worked with my flight controller.) Different flight controllers
and transmitters use different protocols to communicate with each other so I had to find one that
was cheap and compatible. Eventually I settled on the [Flysky FS i6x](https://www.amazon.com/Flysky-FS-i6X-Transmitter-FSs-iA6B-Receiver/dp/B0744DPPL8/ref=sr_1_4?dchild=1&keywords=flysky+fs+i6&qid=1620750371&sr=8-4).

Parts List

- [Drone Frame](https://www.amazon.com/gp/product/B013YENQ2W/ref=ppx_yo_dt_b_asin_title_o06_s00?ie=UTF8&psc=1): frame of the drone that holds as the pieces together
- [ESC](https://www.amazon.com/gp/product/B07D5VGF95/ref=ppx_yo_dt_b_asin_title_o05_s01?ie=UTF8&psc=1): electronic speed controller (controls the speed of the motors)
- [Brushless Motors](https://www.amazon.com/gp/product/B075DD16LK/ref=ppx_yo_dt_b_asin_title_o05_s00?ie=UTF8&psc=1): drone motors can be either brushed or brushless. I went with brushless because they're more energy efficient and because brushed motors tend to wear out quicker
- [Lipo Battery](https://www.amazon.com/gp/product/B07MTZK4PB/ref=ppx_yo_dt_b_asin_title_o04_s00?ie=UTF8&psc=1)
- [LiPo Charger](https://www.amazon.com/gp/product/B004FGWY54/ref=ppx_yo_dt_b_asin_title_o04_s00?ie=UTF8&psc=1): these LiPo's are really powerfull and require a special charger to charge them
- [Power Distribution Board](https://www.amazon.com/gp/product/B078JBT2HQ/ref=ppx_yo_dt_b_asin_title_o02_s00?ie=UTF8&psc=1): used to provide power to both the flight controller and Pi)
- [XT60 Power Connector](https://www.amazon.com/gp/product/B01CN62MZE/ref=ppx_yo_dt_b_asin_title_o06_s00?ie=UTF8&psc=1): this connected the LiPo battery to the power distribution board which in turn powered the Pi and flight controller
- [5V UBEC](https://www.amazon.com/gp/product/B01GHMW0C0/ref=ppx_yo_dt_b_asin_title_o02_s00?ie=UTF8&psc=1): this lowered the LiPo voltage to 5V so the Pi could safely draw power
- [Fireproof Battery Storage for Charging](https://www.amazon.com/gp/product/B01N52KN5C/ref=ppx_yo_dt_b_asin_title_o01_s01?ie=UTF8&psc=1): this was essential. I was paranoid the LiPo battery would cause a fire in McShain Hall
- [Battery Voltage Checker](https://www.amazon.com/gp/product/B00XQ91ECA/ref=ppx_yo_dt_b_asin_title_o01_s01?ie=UTF8&psc=1): to track of battery life (it would beep once the battery was low)
- [Propellers](https://www.amazon.com/gp/product/B00Z2X4U3S/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1)
- [Receiver](https://www.amazon.com/gp/product/B07D35C6MQ/ref=ppx_yo_dt_b_asin_title_o09_s00?ie=UTF8&psc=1)
- [Flight Controller](https://www.amazon.com/gp/product/B07MD3ZRKJ/ref=ppx_yo_dt_b_asin_title_o08_s01?ie=UTF8&psc=1): the brain of the drone
- [Transmitter](https://www.amazon.com/gp/product/B0744DPPL8/ref=ppx_yo_dt_b_asin_title_o08_s00?ie=UTF8&psc=1)

### Putting together the Pieces

Once I received all my parts, I started assembling the drone. This was a lot of fun because I was learning
how each individual part played a role in the drone. There were a few instances in previous electronics projects where I
released [magic smoke](https://en.wikipedia.org/wiki/Magic_smoke) in my room. I knew there was greater risk using a high-powered LiPo battery and didn't want to burn down my dorm so I decided to work on my project elsewhere. Since Saint Joe's doesn't have a building dedicated where I could solder, I decided to use the Perch, the campus student lounge late at night. It helped that I worked there as well and had access to the closets, where I stored my parts when I went back to my dorm early in the morning. In the unlikely case something sets off an alarm, I'd be the only one in there.

As the due date for the project drew closer, I was spending a majority of my time in the Perch whether it was
between classes, late into the night, or simply to work my shift. It became an exhilarating schedule. During the day I was at class, doing boring work for other classes, or running community programs for my floor as an RA. At night, I was working on the drone well into the early hours of the morning. I don't think any of my friends really knew what I was up to. My schedule of waking up late and staying up really late meant I was on a completely different schedule than anyone else. I rarely even went out my last semester because I wanted to see this project through. Sometimes the nights were longer than anticpated and I ended up sleeping through my 9:30 the next morning (sorry Dr. Brown!) but eventually I had something working. The code was based on TensorFlow's [examples](https://github.com/tensorflow/examples/tree/master/lite/examples/object_detection/raspberry_pi) and [Edje Electronics repos](https://github.com/EdjeElectronics/TensorFlow-Object-Detection-on-the-Raspberry-Pi). The code would open a stream on the web cam, and check the labels in each frame. If one of the labels was a human, the result was logged to a file
and a text message would be sent.

After working on the drone for a few weeks, one night everything came together. I finally hacked something that worked and was ready to test it out. I left the Perch sometime around 1 am and headed to the field hockey field on the Merion side of campus in pitch dark. I armed the drone and propellers began to spin slowly. My heart began to race. The Raspberry Pi and web cam were hastily bounded to the drone with cheap zip ties and rattled. I slowly pushed the thrust joystick as slowly as possible and the drone became animated and full of life. It sprung up about 50 feet into the air almost instantly. I quickly realized that I would need to change the sensitivity settings. I was initially worried that battery wouldn't be strong enough to power both the drone and the Pi, but the opposite turned out to be the case: the battery was _too_ powerful. And it didn't help that I was new to flying drones aside from the cheap, 20 dollar drone that had a mere fraction of
the power this one possessed. The drone was way too sensitive to fly.

In matter of seconds the only visible part of the drone was the red LED that flashed against the black sky and the loud hum was a faint whisper. The plan was to release the thrust completely and push the thrust again
once the drone got closer to the ground once again. Of course, that was the plan. What actually happened was
the drone fell so fast that by the time I pushed the thruster forward, the drone was falling down too
fast to catch itself and two of its landing feet broke.

The second run was more chaotic than the first. I was able to solve the drone's height stability issue by
switching to 'easy mode' which set the drone to a certain height and allowed the user to control its 2D
coordinates. The controls were still jerky but I managed to get it flying. I don't know how fast my drone
could go but a quick Google search for 3S drones says about 70 miles per hour which seems about right. Eventually I got too confident and got out of easy mode. Big mistake. I tried keeping it at its height but my
drones orientation was off. So when I pressed forward on my transmitter, the drone go forward but forward based on its orientation was to go right and head straight towards the Foley Center, which was originally a
church filled with glass panes. I then went the other direction and played with the controls in real time, trying to figure out which direction was which. The drone zoomed over me and was headed towards City Ave at
a low height. I was certain it would hit a car! My reflexes veered the drone right for about a third of the field and into the turf. The crash was epic. The drone was cover in turf burn and lost another leg in the
process. The drone was literally on its last leg. Surpringly the rest of the parts, including the web cam and
the Pi were fine.

I flew the drone one last time and set it in autohome mode. While the drone was autohoming I recorded the
footage. I was afraid if it crashed anymore, something would break and I wouldn't have any footage to prove
I got it working. I eventually figured out how to tone down the control sensitivity in CleanFlight a few days later. I showcased my drone to my professors and peers. It was generally positive even though by the time I showed off my drone, it was beaten up and covered in turf burns and dust. Eventually I bought a stronger carbon fiber air frame.

Instead of considering the project complete, I considered it just done its first iteration. The project still
had many rough edges and the code base was hacked together quickly because I was running out of time. Aside from that the drone relied on Wifi to send text messages which was unreliable when flying. I wanted to add a cellular module to fix this problem but I ran out of money. The rattling web cam also proved to be unreliable
in detecting humans but I see it as an opportunity to learn about gimbals. Perhaps it'll have a gimbal in the
next iteration. Overall I would consider it still a proof-of-concept. When I found myself unexpectedly with more freetime, I addressed some of these issues in [part two](http://masgai.com/posts/drone-part-two).

---

### Gallery

![0](/images/Drone/0.jpg)
_My LiPo battery did not come with XT60 plugs so I soldered the XT60 plugs
off my 3D printer and attached them to the drone._
![1](/images/Drone/1.jpg)
![2](/images/Drone/2.jpg)
![3](/images/Drone/3.jpg)
![4](/images/Drone/4.jpg)
![5](/images/Drone/5.jpg)
_Drone feat. Pizza_
![6](/images/Drone/6.jpg)
_Assembling things late into the night._
![7](/images/Drone/7.jpg)
![8](/images/Drone/8.jpg)
![9](/images/Drone/9.jpg)
![10](/images/Drone/10.jpg)
_Originally I ordered a Nav32 flight controller. For some reason I couldn't
get it to communicate with my laptop and transmitter. I don't remember the
details but I do remember buying the APM2.8 after much frustration._

![11](/images/Drone/11.jpg)
![12](/images/Drone/12.jpg)
![13](/images/Drone/13.jpg)
![14](/images/Drone/14.jpg)
_I was following a YouTube video that said is was safe to flash a firmware
to the flight controller while the LiPo battery was connected to the flight
controller. Once I connected my laptop to the drone, my laptop made a popping
noise and I shorted out the motherboard. This was less than one week before
my presentation was due. I ended up going to MicroCenter the next day and
buying a W530 ThinkPad. A few months after graduating I replaced the
motherboard and still use the laptop today._

![15](/images/Drone/15.jpg)
_Eventually campus security caught on to me being in The Perch really late
into the night and told me The Perch was closed... even though it's [open 24
hours](https://en.wikipedia.org/wiki/Saint_Joseph's_University). I didn't argue
although I was bummed I would have to work in my crowded room. It didn't make
much of a difference though since I was done soldering all the components._

![16](/images/Drone/16.jpg)
![17](/images/Drone/17.jpg)
![18](/images/Drone/18.jpg)
_Gnarly turf burn._

![19](/images/Drone/19.jpg)
![20](/images/Drone/20.jpg)
_My attempt to fix my broken air frame was futile. If I could manage to
connect two fragments back together they almost immediately broke when
attempting to fly again due to the motors exerting pressure on the air
frame. I recently purchased a so called carbon fiber version that I hope  
 will make up for my reckless flying._

![21](/images/Drone/21.jpg)
_This was interesting. One time while flying, I forgot to include the voltage
checker to the drone. When the battery died, I was flying it about fifty feet
in the air. While falling the lipo battery ended up unplugged from the
power board and managed to slip out of the velcro straps holding it in place
and ended up falling. Despite their reputation for being fragile, mine
miraculously was fine. [Tis but a scratch](https://www.youtube.com/watch?v=ZmInkxbvlCs)._

Footage:

- [Armed](/images/Drone/23.mp4)
- [Landing](/images/Drone/22.mp4)
- [Landing 2](/images/Drone/24.mp4)
- [Big things coming](/images/Drone/25.mp4)
