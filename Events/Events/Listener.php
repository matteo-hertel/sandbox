<?php

namespace Events;

use Symfony\Component\EventDispatcher\Event;

class Listener
{
    public function trigger(Event $event)
    {
        if(method_exists($event, "handle")){
            $event->handle();
        }
    }
}
