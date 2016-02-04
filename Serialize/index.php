<?php

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;



require __DIR__ . '/vendor/autoload.php';

require __DIR__ . '/class/Person.php';

$encoders = array(new XmlEncoder(), new JsonEncoder());
$normalizers = array(new ObjectNormalizer());

$serializer = new Serializer($normalizers, $encoders);

$person = new Person();
$person->setName('foo');
$person->setAge(99);
$person->setSportsman(false);

echo"<pre style='color:#59E817; background-color:black; word-wrap:break-word;'>";
var_dump($serializer->serialize($person, 'json'));
echo"</pre>";
echo"<pre style='color:#59E817; background-color:black; word-wrap:break-word;'>";
var_dump($serializer->serialize($person, 'xml'));
echo"</pre>";
