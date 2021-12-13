# Overview

A simple web application for practising basic knowledge of the frontend , i.e. html, javascript and css.

This application is adapted from [this article](https://segmentfault.com/a/1190000039947732). Thanks to the author of this article.

# Principle

Assume that we need to show 4 pictures in a carousel, which are denoted as: 

    [0] [1] [2] [3]

then we need to arrange the 4 pictures in an order like:

    [3] [0] [1] [2] [3] [0]

Here, the six pictures will be placed side by side, and combined into a single HTML element. So the carousel effect could be implemented by update the `left` attribute of the HTML element regularly. 

From the arrangement we could notice that `[3]` and `[0]` appear twice, which will work for fooling the user's eyes when switching from `[3]` to `[0]` and then `[1]`, or from `[0]` to `[3]` and then `[2]` respectively.

Taking switching from `[3]` to `[0]` and then `[1]` for example, after switching from `[3]` to `[0]` (waiting till the end of the transition) and before from `[0]` to `[1]`, by updating the `left` attribute, we replace the currently shown `[0]` with the first `[0]` INSTANTLY without the transition animation, then when the next transition comes, it can smoothly switch from `[0]` to `[1]` with the animation.

The same principle applies also to the reverse direction.

# Demo
<!-- ![img](demo.gif =100x100) -->
<img src="demo.gif" alt="demo" width="600"/>

# Next step you can go further
- [ ] Create the navigation dots dynamically, according to the number of pictures.
- [ ] Make the dots clickable and updating the carousel responsively.
