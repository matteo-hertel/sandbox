<?php
namespace Events;

class EventsRegister{

    protected $dispatcher;

    protected $listeners = [
    'event.name' => \Events\Handler\Handler::class,
    "event.papoi" => \Events\Handler\Papoi::class
    ];

    public function __construct(){
        $this->dispatcher = Dispatcher::getDispatcher();
    }

    public function register(){
        foreach ($this->listeners as $event => $class) {
            if(!class_exists($class)){
                exit();
            }
            $this->dispatcher->addListener($event, [new $class, "handle"]);
        }
    }

}
