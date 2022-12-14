<?php
final class Foo
{
    public $bar;
}

$foo = new Foo;
$foo->bar = 12;
echo "<pre>";
echo "foo->bar = $foo->bar\n";

$foo1 = $foo;
$foo1->bar = 13;
echo "foo->bar = $foo->bar    foo1->bar = $foo1->bar\n";

$foo2 = clone $foo;
$foo2->bar = 14;
echo "foo->bar = $foo->bar    foo1->bar = $foo1->bar    foo2->bar = $foo2->bar";