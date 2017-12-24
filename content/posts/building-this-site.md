---
title: "Building This Site"
date: 2017-12-23T23:16:51-05:00
draft: false
tags: ["web development", "2017"]
---
I built this website using basic HTML, CSS, JS, and the [Bootstrap](http://getbootstrap.com) framework. The particles on the homepage where created using open source software [particle.js](https://github.com/VincentGarreau/particles.js/). Looking back at it, using Bootstrap was completely overkill for this project since I only used for its 12 grid system. A more appropriate CSS framework would have been [Skeleton](http://getskeleton.com), which I might migrate to in the near future.

In order to create blog posts, I had to learn how to use
static site generator Hugo. By opting for Hugo my website does not use a database. As a result, web pages load faster since there is not any data that needs to be retrieved from some remote database and the site is overall more secure. As for the Hugo theme (which stylizes the articles and layout of the articles), I chose the very simple and very popular theme [Kiss](https://themes.gohugo.io/kiss/). For hosting, I chose to use my Github account since it's free.
