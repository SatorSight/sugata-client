<?php
namespace App\Lib;
class SUtils{

    const TIME_INTERVAL_ARRAY = [
        'year' => 31536000,
        'month' => 2592000,
        'week' => 604800,
        'day' => 86400,
        'hour' => 3600,
        'minute' => 60,
        'second' => 1,
    ];
    const MAX_COOKIE_TIME = 2147483647;

    public static function dump($data) : void {
        echo '<pre>';
        print_r($data);
        echo '</pre>';
    }

    public static function dump_console($data) : void {
        echo  "\n";
        print_r($data);
        echo  "\n";
    }

    public static function trace($data = [], $trail = '---') : void {
        echo '<pre>';
        print_r($data);
        echo '</pre>';
        die($trail);
    }

    public static function var($data, $trail = '---') : void {
        var_dump($data);
        die($trail);
    }

    public static function to_s($data, $pre = false) : string {
        return $pre ? '<pre>'.print_r($data, true).'</pre>' : print_r($data, true);
    }

    public static function to_s_special($data, $pre = false) : string {
        return $pre ? htmlspecialchars('<pre>'.print_r($data, true).'</pre>') : htmlspecialchars(print_r($data, true));
    }

    public static function get_client_ip() : ?string {
        if (getenv('HTTP_CLIENT_IP'))
            $ipAddress = getenv('HTTP_CLIENT_IP');
        else if(getenv('HTTP_X_FORWARDED_FOR'))
            $ipAddress = getenv('HTTP_X_FORWARDED_FOR');
        else if(getenv('HTTP_X_FORWARDED'))
            $ipAddress = getenv('HTTP_X_FORWARDED');
        else if(getenv('HTTP_FORWARDED_FOR'))
            $ipAddress = getenv('HTTP_FORWARDED_FOR');
        else if(getenv('HTTP_FORWARDED'))
            $ipAddress = getenv('HTTP_FORWARDED');
        else if(getenv('REMOTE_ADDR'))
            $ipAddress = getenv('REMOTE_ADDR');
        else
            $ipAddress = null;
        return $ipAddress;
    }

    public static function removeSpaces(string $str) : string {
        if(strpos($str, '  ') !== false)
            return self::removeSpaces(str_replace('  ', ' ', $str));
        else return trim(str_replace("\r\n", '',$str));
    }

    public static function log($data, $path = ''){
        $date = new \DateTime();
        $date = $date->format('Y-m-d H:i:s');
        if(empty($path)) $path = realpath(__DIR__.'/../../../var/logs/').'/all.log';
        if(is_array($data)) $data = self::to_s($data);
        file_put_contents($path, $date.': '.$data."\n", FILE_APPEND);
    }

    public static function normalizeTel(string $tel) : string{
        $tel = str_replace('(', '', $tel);
        $tel = str_replace(')', '', $tel);
        $tel = str_replace(' ', '', $tel);
        $tel = str_replace('-', '', $tel);
        return trim($tel);
    }

    public static function getDirContents($dir, &$results = array()) : array {
        $files = @scandir($dir);
        if(!is_array($files) || !$files) return [];
        foreach($files as $key => $value){
            $path = realpath($dir.DIRECTORY_SEPARATOR.$value);
            if(!is_dir($path)){
                $results[] = $path;
            }else
                if($value != "." && $value != "..")
                    self::getDirContents($path, $results);
        }
        return $results;
    }

    public static function addTwoUnderlinesToFileNameInPath($path){
        $fileName = substr($path, strrpos($path, '/') + 1);
        $newFileName = '__'.$fileName;
        return str_replace($fileName, $newFileName,$path);
    }

    public static function addPrefixToFileNameInPath($path, $prefix){
        $fileName = substr($path, strrpos($path, '/') + 1);
        $newFileName = $prefix.$fileName;
        return str_replace($fileName, $newFileName,$path);
    }

    public static function getSentencesByDot($text, $how_much = 2){
        if(strpos($text, '.') === false) return $text;
        $r = '';
        for($i = 0; $i < $how_much; $i++){
            $sub = substr($text, 0, strpos($text,'.') + 1);
            $r .= $sub;
            $text = str_replace($sub, '', $text);
        }
        return $r;
    }

    public static function getTimeDifference(\DateTime $dateTime, $unit, $precision){
        $nowTime = time();
        $inputTime = $dateTime->getTimestamp();
        $diff = $nowTime - $inputTime;
        return round($diff / self::TIME_INTERVAL_ARRAY[$unit], $precision);
    }

    public static function getRandomNumber($start = 0, $end = 10, $not = null){
        if(!empty($not))
            if(($end - $start) < 2)
                die('You are going into recursion, dude');
        $number = rand($start, $end);
        if(!empty($not))
            if(is_array($not)) {
                if (in_array($number, $not))
                    return self::getRandomNumber($start, $end, $not);
            }else
                if($number == $not)
                    return self::getRandomNumber($start, $end, $not);
        return $number;
    }

    public static function addParameterToUrl($param, $value, $url = '', $isTheOnlyParam = null){
        $paramString = $param.'='.$value;
        if($isTheOnlyParam === null)
            return strpos($url, '?') !== false ? $url.'&'.$paramString : $url.'?'.$paramString;
        else
            return $isTheOnlyParam ? '?'.$paramString : '&'.$paramString;
    }

    public static function starts_with_upper($str) {
        $chr = mb_substr ($str, 0, 1, "UTF-8");
        return mb_strtolower($chr, "UTF-8") != $chr;
    }

    public static function getAllHeaders(){
        $headers = [];
        foreach($_SERVER as $name => $value)
            if (substr($name, 0, 5) == 'HTTP_')
                $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
        return $headers;
    }

    public static function dateTimeToString(\DateTime $dateTime, $format = 'Y-m-d H:i:s'){
        return $dateTime->format($format);
    }

    public static function dateOlderThan(\DateTime $date, int $than){
        $now = new \DateTime();
        $time_diff = $now->getTimestamp() - $date->getTimestamp();
        return $time_diff > $than;
    }

    public static function redirectToUrl($url){
        if(strpos($url, 'http') === false) {
            if (strpos($url, '//') === false)
                $url = 'http://' . $url;
            else
                $url = 'http:' . $url;
        }
        header('Location: '.$url);
        die();
    }

    public static function extractFileNameFromPath($path){
        return substr($path, strrpos($path, '/') + 1);
    }

    public static function getFirstMissingNumber(array $array){
        if(empty($array))
            return 1;

        sort($array);

        if($array[0] > 1)
            return 1;

        foreach ($array as $key => $item)
            if($key != 0)
                if($item - $array[$key - 1] > 1)
                    return $array[$key - 1] + 1;

        return array_pop($array);
    }

    public static function russianBoldWrap($query, $text){
        $pos = mb_stripos($text, $query);
        if($pos === false)
            return $text;

        $source_query = mb_substr($text, $pos, mb_strlen($query));
        $bold = '<strong>'.$source_query.'</strong>';
        $before = mb_substr($text, 0, $pos);
        $after = mb_substr($text, $pos + mb_strlen($query));

        return $before.$bold.$after;
    }

    public static function removeSchemeAndDomainFromUrl($url){
        $url = str_replace('https://', '', $url);
        $url = str_replace('http://', '', $url);
        $url = substr($url, strpos($url, '/'));
        return $url;
    }

    public static function getFilenameFromPath(string $path) : string {
        return basename($path);
    }

    public static function randomCharacter() : string {
        $seed = str_split('abcdefghijklmnopqrstuvwxyz'
            .'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            .'0123456789');
        shuffle($seed);
        return $seed[0];
    }

    public static function getRuMonthDeclined(int $date){
        $format = '%bg';
        $months = explode("|", '|Января|Февраля|Марта|Апреля|Мая|Июня|Июля|Августа|Сентября|Октября|Ноября|Декабря');
        $format = preg_replace("~\%bg~", $months[date('n', $date)], $format);
        return strftime($format, $date);
    }

    public static function getRuMonth(int $date){
        $format = '%bg';
        $months = explode("|", '|Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь');
        $format = preg_replace("~\%bg~", $months[date('n', $date)], $format);
        return strftime($format, $date);
    }
}