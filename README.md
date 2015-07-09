# proxy-fetch
Just a quick CLI tool to get me a HOST:PORT of a proxy off http://proxynova.com

##### Install

    npm i -g git+https://github.com/valer-cara/proxy-fetch.git

##### Example run

    $ proxy-fetch
    Country: China - Qingdao | Uptime: 38%
    218.201.183.19:8080
    218.201.183.19:8080
    
    $ proxy=`proxy-fetch`
    Country: China - Qingdao | Uptime: 38%
    218.201.183.19:8080
    
    $ echo $proxy
    218.201.183.19:8080
    
wow..
