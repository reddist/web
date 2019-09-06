<?php
    $begin = microtime(true);
    session_start();
	error_reporting(0);
    //$_SESSION["last_hits"] = null;
	$new_game = false;
	$reopen_page = false;
	if($_GET["new"] === "1"){
        $new_game = true;
    } elseif(count($_POST) === 0) {
        $reopen_page = true;
    }
    #var_dump($_POST);
    $x = "";
    $y = "";
    $r = "";
    #var_dump($_SESSION["last_hits"]);
    if($_SESSION["last_hits"] === null || $new_game){
        $_SESSION["last_hits"] = "count=0;results=;x=;y=;r=";
        $new_game = true;
        $_POST = [
            "y" => 0,
        ];
        //var_dump($new_game);
    } elseif(!$reopen_page) {#
        $x = (int)$_POST["x"];
        $correct_x = false;
        for($i = -3; $i < 6; $i++)
            if($i === $x) $correct_x = true;
        if(!$correct_x)
            $x = "-";
        $not_normal_y = $_POST["y"];
        $pattern = '#(-?[0-4]([,.][0-9]+)?)|(5(.0+)?)|(-5(.0+)?)#';
        #var_dump(preg_match($pattern, $not_normal_y));
        if(preg_match($pattern, $not_normal_y) === 0){
            #var_dump($not_normal_y);
            $y = "-";
            $_POST["y"] = "0";
        } else {
            $y = (double)(str_replace(",", ".", $not_normal_y));
        }
        $r = null;
        // echo "x" . " = " . $x . "<br>";
        // echo "y" . " = " . $y . "<br>";
        $r_indexes = ["r1", "r2", "r3", "r4", "r5"];
        for($i = 0; $i < 5; $i++){
            if($_POST[$r_indexes[$i]] !== null){
                // echo "r" . $i . " = " . $_POST["r" . $i] . "; ";
                $r = (preg_match("#[0-5]#", $_POST[$r_indexes[$i]]) !== 0 ? (int)$_POST[$r_indexes[$i]] : -10);
            }
        }
        $result = "Вы не попали!";
        $bool_result = false;
        $unchecked = false;
        if($r === null){
            $r = 0;
            $unchecked = true;
        }
        $half_r = $r / 2;
        if($y >= 0 && $x >= 0){
            if (($x*$x + $y*$y) <= $r*$r/4){
                $result = "Вы попали!";
                $bool_result = true;
            }
        }
        if($y >= 0 && $x <= 0){
            if ((-$x) <= $half_r && $y <= $r){
                $result = "Вы попали!";
                $bool_result = true;
            }
        }
        if($y <= 0 && $x <= 0){
            if (-($x + $y) <= $r){
                 $result = "Вы попали!";
                $bool_result = true;
            }
        }
        if($unchecked){
            $result = "Область не была выбрана!";
            $bool_result = false;
        }
        $correct_r = false;
        for($i = 0; $i < 6; $i++)
            if($i === $r) $correct_r = true;
        if(!$correct_r)
            $r = "-";
        if($x === "-"){
            $result = "x был введён неправильно!";
            $bool_result = false;
        }
        if($y === "-"){
            $result = "y был введён неправильно!";
            $bool_result = false;
        }
        if($r === "-"){
            $result = "r был введён неправильно!";
            $bool_result = false;
            $r = 0;
        }
    } else {
        $last_hits = explode(';', $_SESSION["last_hits"]);
        $count = (int)explode("=", $last_hits[0])[1];
        if($count === 0){
            $result = "Стреляйте!";
            $r = 1;
            $_POST = [
                        "y" => 0,
                    ];
        } else {
            $last_results = explode("=", $last_hits[1])[1];
            $last_x = explode(" ", explode("=", $last_hits[2])[1]);
            $last_y = explode(" ", explode("=", $last_hits[3])[1]);
            $last_r = explode(" ", explode("=", $last_hits[4])[1]);
            $x = (int)$last_x[$count - 1];
            $y = (double)$last_y[$count - 1];
            $r = (int)$last_r[$count - 1];
            #var_dump($x, $y, $r);
            $correct_x = false;
            for($i = -3; $i < 6; $i++)
                if($i === $x) $correct_x = true;
            $correct_r = false;
            for($i = 0; $i < 6; $i++)
                if($i === $r) $correct_r = true;
            $result = "Вы не попали!";
            #var_dump($last_y[$count - 1]);
            if($last_x[$count - 1] !== "-" && $last_y[$count - 1] !== "-" && $last_r[$count - 1] !== "-"){
                $bool_result = false;
                $unchecked = false;
                $_POST = [
                    "y" => $y,
                ];
                if($r === null){
                    $r = 0;
                    $unchecked = true;
                }
                $half_r = $r / 2;
                if($y >= 0 && $x >= 0){
                    if (($x*$x + $y*$y) <= $r*$r/4){
                        $result = "Вы попали!";
                        $bool_result = true;
                    }
                }
                if($y >= 0 && $x <= 0){
                    if ((-$x) <= $half_r && $y <= $r){
                        $result = "Вы попали!";
                        $bool_result = true;
                    }
                }
                if($y <= 0 && $x <= 0){
                    if (-($x + $y) <= $r){
                         $result = "Вы попали!";
                        $bool_result = true;
                    }
                }
                if($unchecked){
                    $result = "Область не была выбрана!";
                    $bool_result = false;
                }
            } else {
                if($last_x[$count - 1] === "-")
                    $x = "-";
                if($last_y[$count - 1] === "-")
                    $y = "-";
                if($last_r[$count - 1] === "-")
                    $r = "-";
            }
            if(!$correct_r)
                $r = "-";
            if($x === "-"){
                $result = "x был введён неправильно!";
                $bool_result = false;
            }
            if($y === "-"){
                $result = "y был введён неправильно!";
                $bool_result = false;
                $_POST = [
                    "y" => 0,
                ];
            }
            if($r === "-"){
                $result = "r был введён неправильно!";
                $bool_result = false;
                $r = 0;
            }
        }
    }
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Лабораторная №1 по web-программрованию Васькин Алексей P3200</title>
    <link rel="stylesheet" href="main-page.css">
</head>
<body>
<header>
    <strong>ФИО:</strong> Васькин Алексей Андреевич&emsp;
    <strong>Группа:</strong> P3200&emsp;
    <strong>Вариант:</strong> 200004
</header>
<main>
    <section>
        <div class="img-wrap">
            <?php
                if(!$new_game)
                    echo '<img src="img/coordinates-' . $r . '.png" alt="Координатная плоскость" id="coordinates">';
                else
                    echo '<img src="img/coordinates-1.png" alt="Координатная плоскость" id="coordinates">';
            ?>
            <img src="img/hit.png" alt="Точка выстрела" id="hit">
            <img src="img/possible-hit.png" alt="Точка выстрела" id="possible-hit" hidden>
        </div>
        <div class="result">
            <?php
                if(!$new_game)
                    echo '<p class="danger message">' . $result . '</p>';
                else
                    echo '<p class="danger message">Стреляйте!</p>';
            ?>
            <table class="message">

                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                </tr>
                <?php
                    $success = 'class="success"';
                    $miss = 'class="miss"';
                    $last_hits = explode(';', $_SESSION["last_hits"]);
                    #var_dump($_POST["last_hits"]);
                    #var_dump($_SESSION["last_hits"]);
                    #var_dump($last_hits);
                    $count = (int)explode("=", $last_hits[0])[1];
                    $last_results = explode("=", $last_hits[1])[1];
                    $last_x = explode(" ", explode("=", $last_hits[2])[1]);
                    $last_y = explode(" ", explode("=", $last_hits[3])[1]);
                    $last_r = explode(" ", explode("=", $last_hits[4])[1]);
                    #var_dump($last_results);
                    #var_dump($reopen_page);
                    if(!$new_game && !$reopen_page){
                        if(!$correct_r || $unchecked)
                            $r = "-";
                        $last_results .= ($bool_result ? "1" : "0");
                        $last_x[$count] = $x;
                        $last_y[$count] = $y;
                        $last_r[$count] = $r;
                        $count += 1;
                    }
                    for($i = $count - 1; $i >= 0; $i--){
                        echo '<tr>
                                <td id="resultX" ' . ($last_results{$i} === "1" ? $success : $miss) . '>'
                                    . $last_x[$i] . '</td>';
                        echo   '<td id="resultY" ' . ($last_results{$i} === "1" ? $success : $miss) . '>'
                                                                 . $last_y[$i] . '</td>';
                        echo   '<td id="resultR" ' . ($last_results{$i} === "1" ? $success : $miss) . '>'
                                                                 . $last_r[$i] . '</td>';
                        echo '</tr>';
                    }
                    if($new_game || ($reopen_page && $count === 0)){
                        echo '<tr><td id="resultX"></td><td id="resultY"></td><td id="resultR"></td></tr>';
                    }
                ?>
            </table>
            <?php
                if(!$new_game && $count > 0) echo '<a href="index.php?new=1">Начать заново</a>';
            ?>
        </div>
    </section>
    <section>
        <form name="f1" method="post" action="index.php" id="form">
            <fieldset>
                <legend>X</legend>
                <div>
                    <label for="x-3" id="label-x-3">
                        <input type="radio" name="x" value="-3" id="x-3" <?php
                            if($x === -3) echo 'checked';?>>-3
                    </label>
                    <label for="x-2" id="label-x-2">
                        <input type="radio" name="x" value="-2" id="x-2" <?php
                            if($x === -2) echo 'checked';?>>-2
                    </label>
                    <label for="x-1" id="label-x-1">
                        <input type="radio" name="x" value="-1" id="x-1" <?php
                            if($x === -1) echo 'checked';?>>-1
                    </label>
                    <label for="x0" id="label-x0">
                        <input type="radio" name="x" value="0" id="x0" <?php
                            if($x === 0 || !$correct_x || $new_game) echo 'checked';?>>0
                    </label>
                    <label for="x1" id="label-x1">
                        <input type="radio" name="x" value="1" id="x1" <?php
                            if($x === 1) echo 'checked';?>>1
                    </label>
                    <label for="x2" id="label-x2">
                        <input type="radio" name="x" value="2" id="x2" <?php
                            if($x === 2) echo 'checked';?>>2
                    </label>
                    <label for="x3" id="label-x3">
                        <input type="radio" name="x" value="3" id="x3" <?php
                            if($x === 3) echo 'checked';?>>3
                    </label>
                    <label for="x4" id="label-x4">
                        <input type="radio" name="x" value="4" id="x4" <?php
                            if($x === 4) echo 'checked';?>>4
                    </label>
                    <label for="x5" id="label-x5">
                        <input type="radio" name="x" value="5" id="x5" <?php
                            if($x === 5) echo 'checked';?>>5
                    </label>
                </div>
            </fieldset>

            <fieldset>
                <legend>Y</legend>
                <label for="y-text">
                    <input name="y" type="text" maxlength="6" placeholder="Введите координату Y" required id="y-text"
                        <?php echo 'value="' . $_POST["y"] . '"';?> pattern="(-?[0-4]([,.][0-9]+)?)|(5(.0+)?)|(-5(.0+)?)">
                    (-5.0 ... 5.0)&emsp;
                </label>
            </fieldset>

            <fieldset>
                <legend>R</legend>
                <label for="check1" id="label-checkbox-1">
                    <input name="r1" type="checkbox" value="1" id="check1"
                        <?php if($r === 1 || $new_game) echo 'checked';?>>1
                </label>
                <label for="check2" id="label-checkbox-2">
                    <input name="r2" type="checkbox" value="2" id="check2"
                        <?php if($r === 2) echo 'checked';?>>2
                </label>
                <label for="check3" id="label-checkbox-3">
                    <input name="r3" type="checkbox" value="3" id="check3"
                        <?php if($r === 3) echo 'checked';?>>3
                </label>
                <label for="check4" id="label-checkbox-4">
                    <input name="r4" type="checkbox" value="4" id="check4"
                        <?php if($r === 4) echo 'checked';?>>4
                </label>
                <label for="check5" id="label-checkbox-5">
                    <input name="r5" type="checkbox" value="5" id="check5"
                        <?php if($r === 5) echo 'checked';?>>5
                </label>
            </fieldset>
            <br />
            <input type="submit" name="shoot" value="Выстрел!" id="shoot">
            <input type="hidden" name="offset" id="timezone">
            <?php
                //echo '<input type="hidden" name="last-hits" id="last-hits-for-table"
                if($reopen_page){
                    $x = "";
                    $y = "";
                    $r = "";
                }
                $table_value = "count=" . ($new_game ? 0 : $count) . ";results=" .
                    ($new_game ? ';x=' : ($last_results . ";x="));
                $table_value = $table_value . explode("=", $last_hits[2])[1] . $x . ($new_game || $reopen_page ? ';y=' : ' ;y=');
                $table_value = $table_value . explode("=", $last_hits[3])[1] . $y . ($new_game || $reopen_page ? ';r=' : ' ;r=');
                $table_value = $table_value . explode("=", $last_hits[4])[1] . ($r === 0 ? '-' : $r) . ($new_game || $reopen_page ? '' : ' ');
                #var_dump($table_value);
                $_SESSION["last_hits"] = $table_value;
            ?>
        </form>
        <script src="form-scenery.js"></script>
    </section>
    <footer>
        <?php
            if(!$new_game && !$reopen_page){
                echo '<p><span class="time">Текущее время: ' . date("H:i:s, d-m-Y", time() + 60 * (-(double)$_POST["offset"])) . '</span>';
                echo '<span class="time">Время работы скрипта: ' . round(microtime(true) - $begin, 6) * 1000 . ' ms</span></p>';
            }
            echo '<p><a href="https://github.com/reddist/web/tree/master/weblab1">Репозиторий</a></p>';
            session_close();
        ?>
    </footer>
    </main>
</body>
</html>