<!-- welcome.blade.php -->

<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="HandheldFriendly" content="true" />
    <meta name="MobileOptimized" content="320" />
    <title>Laravel</title>
    <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <style>
        @import "/css/font.css";
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

        @media (max-height: 280px) {
            body {font-size: 8px;}
        }
        @media (min-height: 280px) and (max-height: 400px) {
            body {font-size: 9px;}
        }
        @media (min-height: 400px) and (max-height: 500px) {
            body {font-size: 10px;}
        }
        @media (min-height: 500px) and (max-height: 600px) {
            body {font-size: 12px;}
        }
        @media (min-height: 600px) and (max-height: 900px) and (min-width: 370px) {
            body {font-size: 12px;}
        }
        @media (min-height: 600px) and (max-height: 900px) and (max-width: 370px) {
            body {font-size: 11px;}
        }
        @media (min-height: 900px) {
            body {font-size: 15px;}
        }
    </style>
</head>
<body>
<div id="root"></div>
<script src="{{asset('/js/app.js')}}" ></script>
</body>
</html>