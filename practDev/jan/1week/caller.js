var redis = require('./cleanerapp');


redis.set("setter", "strong key");
redis.set("setter", "strong new key");
redis.set("setter", "another new key");
redis.set("setter", "plus new key");
redis.printSet("setter");
