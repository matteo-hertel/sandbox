<?php

namespace Events\Handler;

use Symfony\Component\EventDispatcher\Event;

class Papoi extends Event{

    public function handle(Event $event){
        echo"<pre style='color:#59E817; background-color:black; word-wrap:break-word;'>";
        var_dump($event->message);
        echo"</pre>";
    }
}
