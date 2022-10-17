This folder contains the facade methods which our api will use to interact with
the moviedb api (watchmode, currently). 

We are essentially defining our own api-layer on top of watchmode's api so that
if in the future we need to switch from watchmode to another movie database api
(like The Movie Database), we are able to do so without having to gut the 
entire codebase.