---
title: "First Hackathon"
date: 2018-04-15T20:57:59-04:00
draft: true
tags: ["2018"]
---

# Philly Codefest '18

<center>![Our Project](/images/first-hackathon/gallery.jpg)</center>
Hackathons are almost a rite of passage for computer science students so it was about time that I went to one. I recently participated in Philly Codefest at Drexel University where the theme was to create something for social good. The overall experience was quite memorable and lots of fun.

I had always wanted to go to a hackathon since freshmen year but never felt prepared or good enough. The thought of being on a team with 4 or 5 other programmers for over 24 hours and not being able to contribute any meaningful work due to lack of skills deterred me from hackathons. As a result, I chose to knock out all my core CS classes and a few electives before going to my first hackathon but then I came to a realization.

As a third year CS student, I’ve now come to understand that I will never be 100% ready for hackathons or my first job. Computer science is evolving faster than anyone can keep up and continues to span both in breadth and depth; only a fool would try to learn it all. Of course, there are the fundamentals that everyone should learn, regardless of what path in CS they may pursue such as mobile app development or embedded systems. These core concepts include but not limited to data structure, algorithms, paradigms of programming, operating systems, discrete math, and computer architecture. Since I’ve taken all these classes already, I have no excuses. I had my mind set. I began looking into upcoming hackathons that are close by and came across Philly Codefest at Drexel University. All I needed was a team.

Unfortunately no one else in my classes wanted to go to a hackathon for one of three reasons:

* They did not want to be locked up in a room all weekend hacking away a project since they already code enough in school
* They did not feel adequately prepared to compete against others in a completive way
* The timing just wasn’t right. Something came up

<center>![The room minus all the screaming basketball fans](/images/first-hackathon/room.jpg)</center>

I was initially disappointed by the lack of interest from my peers yet I still wanted to go. After contemplating back and forth for about a day, I decided I would go anyway. Going to a hackathon can be pretty unnerving for first timers. It will vary among hackathons but the gist is that tens to hundreds of sleep-deprived, caffeinated programmers are all in one very large room. At Drexel, we were all in Daskalakis Athletic Center.

### Aura

The atmosphere was incredible. Some of the most passionate computer scientists in Philadelphia were under the same roof, typing away on their keyboards implementing novel features to their software, eyes searching for bugs, people networking with prospective employers, and of course, hackathon veterans and newcomers alike loading up on free food and goods from generous companies.

### My Group

Once I joined a group, we began to get down to work. My group consisted of Siling who is a grad student, Austin who is an undergrad student, Chris who is a business professor, and Bethany who is pursuing an MBA. Our diverse backgrounds and skillsets would help us and hinder us in a few ways. When I joined the team, the rest of my teammates had already decided on a project.

Bethany’s came up with the idea after experiencing her partner’s frustration as a diabetic. We created a web site that would determine price tiers for diabetics based on their needs from insurance providers. This solves a problem all diabetics face because price information for medication is not available online anywhere and prices are usually only updated twice a year. The previous solution would be call your insurance provider and ask or wait for your bill to come in. Anyone who has had to talk to any company over the phone for more than thirty seconds knows how frustrating and cumbersome the process is and being updated biannually is not useful if a patient needs information now.

### Choosing a Backend Technology

Aside from coming up with the idea, Bethany created all the images for the site and worked on the design. Chris did frontend using HTML, CSS, and jQuery to design an intuitive user experience. I then would take that information and store it into our database that was created by Siling. Austin created a search bar and helped with some backend too. Despite these roles, we all tended to do a little bit of everything and help out where we could. One of our strongest qualities was constant communication and a practical mindset. Initially I wanted to include a PHP-based chat bot that would pick apart key phrases from the patients sentences and determine what medicine they would need information on. Time was our biggest constraint so this idea was not put in place. Our second biggest constraint was our diverse skill set which was a double edged sword. Our collective breadth of knowledge easily allowed us to divide the work up fairly easy. However, our first major roadblock was what technology to use on the backend. Austin had worked with the Python framework Django, Siling was experienced in PHP, and I had be learning Node.js on the side by building a few projects.

Bethany and Chris were working seamlessly in their respective divisions while the three of us had reached a standstill before even starting. We chose to determine what backend technology to use based on who had the most experience with their language and framework. We decided that for a simple site like the one we had in mind, PHP was our best bet. Node and Django may have been a bit overkill. That meant that Austin and I would have to learn along the way and quickly; we only 36 hours to go from idea to final project.

<center>![PHP](/images/first-hackathon/logo.svg)</center>

I dived right into PHP’s documentation and used [this tutorial](https://www.tutorialspoint.com/php/index.htm) to fill in the gaps. We after learning the basics of the language as quickly as I could, I got down to work. Siling and I would handle user information and store it to a database. We had to make sure our product did not violate HIPA. Although I admittedly do not know much about the laws surrounding HIPA, we as a team consciously made our site anonymize user information that we would have through their cosent. It was around 2am when everyone was finished and we decided as a team to meet around 12pm.

After some finishing touches, we presented our project to numerous groups of judges, explaining the current issues that diabetics faced, and how our product provided some convenience to their lives. We received generally positive feedback from the judges who were impressed with its ease of use and practicality. We demonstrated for each group how to sign up and use our software to see results based off the criteria entered.

### Takeaways

Overall, I was very pleased with our final product. Initially I wanted to implement SendGrid and a PHP library called PHPMailer to send changes to medicine to patients via email but we ran out of time. I was able to get a mockup version up and running. The only problem was that we needed data from actual insurance companies to be disclosed to us in order to determine changes made to a patient’s medicine. Without this data, my mailer code was useless so we had to get rid of it. You can find the code on Github [here](https://github.com/thewhiterabbit31/diabeticinsuranceguide). Though we did not win a prize, I was still very content with the outcome of Codefest. My initial goal was meet new people, reach out to potential employers, and build something that brings social good and that was something I accomplished over the weekend.
