<!-- welcome.blade.php -->

<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel</title>
    <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <style>
        /*@import "/css/font.css";*/
        * {margin: 0; padding: 0; line-height: 1; font-family: 'HelveticaNeueCyr', arial, serif; outline: none;}
        body {font-size: 10px;overflow: auto!important;}
        body > .inner {max-width: 720px; margin: 0 auto;}
        a, a:active, a:hover { outline: none; }
        .content > ul {
            overflow: hidden;
            margin: 20px;
            list-style: none;
        }
        .content > ul li {
            padding-left: 5px;
            line-height: 2;
            cursor: pointer;
        }
        .content li:nth-child(odd) {background: #BEBBE2;}
        .content li:nth-child(even) {background: white;}
        @media (min-width: 400px) {body {font-size: 9px;}}
        @media (min-width: 400px) and (max-width: 500px) {body {font-size: 10px;}}
        @media (min-width: 500px) and (max-width: 600px) {body {font-size: 11px;}}
        @media (min-width: 600px) and (max-width: 700px) {body {font-size: 12px;}}
        @media (min-width: 700px) and (max-width: 800px) {body {font-size: 13px;}}
        @media (min-width: 800px) and (max-width: 900px) {body {font-size: 14px;}}
        @media (min-width: 900px) and (max-width: 1000px) {body {font-size: 15px;}}
        @media (min-width: 1000px){body {font-size: 16px;}}
    </style>
</head>
<body>
<div id="root"></div>
<script src="{{asset('http://localhost:8080/js/app.js')}}" ></script>
</body>
</html>