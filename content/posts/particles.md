---
title: "Particles"
date: 2018-01-28T13:20:32-05:00
draft: true
tags: ["c++", "2018"]
---
# Particle Simulation in C++
The title says it all. In this project I wanted to use a simple framework that would
all me to create a GUI of a particle. After searching around, I decided to use Simple
DirectMedia Layer, better known as [SDL](https://www.libsdl.org) and used documentation
and a [YouTube channel](https://www.youtube.com/user/caveofprogramming/videos) to learn
the library and to structure my project.

## Why I Chose this Project
I mainly wanted to do this project to sharpen my C++ skills and learn how to create
a simple GUI using a C++ library. I mainly drew inspiration from people creating
fire simulations in *assembly*. If people can do this in assembly, then I knew could
create my own version in C++.

## C++
Although C++ and Java are syntactically similar, the two programming languages have
some very stark differences. Java follows the programming paradigm of object oriented
programming while C++ is **both** procedural and OOP. Java has a garbage collector
while C++ doesn't meaning you have to allocate and deallocate memory to avoid garbage
values and potential bugs. This caused a strange error that I kept getting during
runtime which I talk about later in this article. C++ arguments can be passed by
value or by reference by utilizing references and pointers. Java passes by value
through primitive types and passes by reference through objects when calling functions.
Java follows a 'WORA' approach (write once, run anywhere) by using the JVM
(Java Virtual Machine) which translates byte code into machine code. An entire article
could be written on the differences between the two languages but for the rest of
the article, I will talk about my approach to creating this project.

## Setting Up SDL to Work in Xcode
SDL seemed unnecessarily difficult to set up on macOS in comparison to Linux and Windows.
I ran into a few issues but after scouring the internet, I found a [guide](http://lazyfoo.net/tutorials/SDL/01_hello_SDL/mac/xcode/index.php)
that allowed me to get this running. I was able to verify that SDL was linked into
my Xcode project by running the following code in the main method:

```C++
if (SDL_Init(SDL_INIT_VIDEO|SDL_INIT_AUDIO) != 0) {
        SDL_Log("Unable to initialize SDL: %s", SDL_GetError());
        return 1;
    }
    SDL_Quit();
```
Straight from SDL's documentation, the code above is used to initialize the SDL
library. If SDL is properly configured and present in the working project, the
test program will return no errors, otherwise it is going to a negative value.

I decided to make the following classes: Particles, Swarm, & Screen along with
header files for each respective class.

### Particles:
This class focused on the characteristics of each
particle, namely speed and direction when they 'explode'.
This is by far the smallest of the classes.

### Swarm
Swarm focused on the particles as a whole. In this class
I set a const int of the number of particles the program
will have in total. The swarm of particles is then updated
based on the speed of the user's computer. This is done by
calculating how long it takes the user's computer to run
update() which is called in main in a forever while loop. The difference between each interval is multiplied by the
`double xSpeed` and `double  ySpeed` and assigned to member variables `m_x` and `m_y`. This makes the particles animation based on how fast the computer can complete the method each time. Slower computers that take longer to compute will have a higher `interval` value each time
that will cause the particles to go farther every update. This allows both fast and slow computers to run the program effectively and at a constant speed.

### Screen
Screen class was created to handle to actual window that
pops up when the program runs. By default, the window is
800px wide and 600px tall. The class consists of
SDL-type objects. The object pointer window is the actual window that
displays the program. Textures are processed in the buffer by the renderer and
then displayed by the window. Originally, I had a mysterious EXC_BAD_ACCESS bug
that occurred during runtime. This was caused by me accidentally initializing an
SDL unsigned 32-bit integer that was already initialized elsewhere in the
program. The reason I specifically needed to use SDL's version of a Uint32 was
to avoid the potential bug of an int being a different value on a different
computer or operating system.

Screen class also does a lot of the behind the scenes
work as well such as ensuring that the components that
made up the display such as the renderer, buffer,
and texture were properly destroyed in the `close()`
method. 
