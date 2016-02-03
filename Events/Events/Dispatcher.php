<?php
namespace Events;

use Symfony\Component\EventDispatcher\EventDispatcher;

class Dispatcher{

    protected static $dispatcher = null;

    private function __construct(){

    }

    public static function getDispatcher(){
        if(null === self::$dispatcher){
            self::$dispatcher = self::generateDispatcher();
        }
        return self::$dispatcher;
    }

    private static function generateDispatcher(){
        return  new EventDispatcher();
    }

}
