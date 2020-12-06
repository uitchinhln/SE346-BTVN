import 'package:flutter/material.dart';
import 'package:bt9/random_words.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Startup Name Generator',
      theme: ThemeData(          // Add the 3 lines from here...
        primaryColor: Colors.redAccent,
      ),                         // ... to here.
      home: RandomWords(),
    );
  }
}

