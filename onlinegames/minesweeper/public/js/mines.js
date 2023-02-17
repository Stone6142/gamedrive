$(document).ready(function () {

    var $body,
        $document,
        $board,
        $grid,
        timer,
        time,
        unstarted;

    function _init() {
        // Cache some common DOM queries
        $document = $(document);
        $body = $('body');
        $body.addClass('loaded');

        // Start Minesweeper
        /* Creating variables and assigning it to the div with the ids. */
        $board = $('#board');
        $grid = $('#grid');
        var $timer = $('#timer');
        var $mineCounter = $('#minecounter');
        var $levelSelect = $('#level');
        /* Creating an object called levels with the size of the grids. */
        var levels = {
            'beginner': '9x9x10',
            'intermediate': '20x16x44',
            'expert': '25x30x100'
        };
        /* Setting the variable level to the value of the levelSelect element. */
        var level = $levelSelect.val();
        var levelParams,
            rows,
            $rows,
            columns,
            cellCount,
            mines,
            freeCells,
            mineTally,
            pauseTime,
            beginnerHighScore = 999,
            intermediateHighScore = 999,
            expertHighScore = 999;

        /* Creating an object with the key being the number of colors and the value being the color. */
        var countColors = { 0: '', 1: 'blue', 2: 'green', 3: 'red', 4: 'blue-dark', 5: 'maroon', 6: 'turquoise', 7: 'purple', 8: 'gray-dark' };

        time = 0;
        timer = false;
        unstarted = true;
        var statusIndicator = '<div class="status-indicator"></div>';

        /**
         * It takes a level number as input and sets the number of rows, columns, mines, and free cells
         * based on the level
         * @param level - The level of difficulty.
         */
        function setLevel(level) {
            levelParams = levels[level];
            rows = parseInt(levelParams.split('x')[0]);
            columns = parseInt(levelParams.split('x')[1]);
            cellCount = rows * columns;
            mines = levelParams.split('x')[2];
            freeCells = cellCount - mines;
        }

        /**
         * It clears the grid, sets the level, sets the game to unstarted, builds the rows and cells,
         * sets the mine counter, and resets the timer
         * @param level - The level of difficulty.
         */
        function setBoard(level) {
            // Clear Grid
            $grid.html(statusIndicator).removeClass('disabled lose win').addClass('unstarted');

            // Set Up Grid
            setLevel(level);

            // Set unstarted
            unstarted = true;

            /* Creating a grid of cells. */
            for (r = 0; r < rows; r++) {
                var newCells = '';
                // Build Cells
                for (c = 0; c < columns; c++) {
                    newCells += '<div class="cell"></div>';
                }
                $grid.append('<div class="row">' + newCells + '</div>');
            }

            // Set Minecounter
            mineTally = mines;
            $mineCounter.html(mineTally);

            // Set Timer
            resetTimer();
        }

        // Set initially
        setBoard(level);
        /* Changing the text of the reset button to a smiley face when the mouse is down and then back
        to a smiley face when the mouse is up. */
        $('html').on('mousedown', '.reset', function () {
            $(this).text('😮');
        }).on('mouseup', '.reset', function () {
            $(this).text('🙂');
            stopTimer();
            level = $levelSelect.val();
            setBoard(level);
        });
        /* Setting the board to the level selected by the user. */
        $('html').on('click', '.status-indicator', function () {
            level = $levelSelect.val();
            setBoard(level);
        });
        /* The above code is listening for a change in the level select dropdown. When a change is
        detected, the timer is stopped and reset, the level is set to the value of the dropdown, and
        the board is set to the level. */
        $levelSelect.on('change', function () {
            stopTimer();
            resetTimer();
            level = $levelSelect.val();
            setBoard(level);
        });

        // Lay Mines
        function layMines(level, clickedCellIndex) {
            $rows = $('.row');
            var freeCells = $('.cell');
            var takenCells = [clickedCellIndex];

            /* Placing mines randomly on the board. */
            for (m = 0; m < mines; m++) {
                var mineCell = Math.floor(Math.random() * Math.floor(freeCells.length));
                // If it happens to be the clicked cell, skip it
                if ($.inArray(mineCell, takenCells) > -1) {
                    m--;
                    continue;
                }
                takenCells.push(mineCell);
                $(freeCells[mineCell]).addClass('mine');
            }

            // Identify Cell Numbers
            var $cells = $('.cell');
            /* The above code is creating a minesweeper game. */
            for (c = 0; c < $cells.length; c++) {
                var $cell = $($cells[c]);
                $cell.attr('data-cell', c);
                // Skip if it's a mine
                if ($cell.is('.mine')) {
                    continue;
                }

                var mineCount = 0;
                var rowPos = Math.floor(c / columns);
                var $currentRow = $cell.closest('.row');
                $currentRow.attr('data-row', rowPos);
                var rowCells = $currentRow.find('.cell');
                var cellPos = c % columns;

                /* Checking if the cell to the left and right of the current cell is a mine. */
                if ($(rowCells[cellPos - 1]).is('.mine')) {
                    mineCount++;
                }
                if ($(rowCells[cellPos + 1]).is('.mine')) {
                    mineCount++;
                }

                /* Checking the previous row for mines. */
                if (rowPos > 0) {
                    var prevRowCells = $($rows[rowPos - 1]).find('.cell');
                    if ($(prevRowCells[cellPos - 1]).is('.mine')) {
                        mineCount++;
                    }
                    if ($(prevRowCells[cellPos]).is('.mine')) {
                        mineCount++;
                    }
                    if ($(prevRowCells[cellPos + 1]).is('.mine')) {
                        mineCount++;
                    }
                }

                /* Checking the cells around the current cell to see if they are mines. */
                if (rowPos < rows - 1) {
                    var nextRowCells = $($rows[rowPos + 1]).find('.cell');
                    if ($(nextRowCells[cellPos - 1]).is('.mine')) {
                        mineCount++;
                    }
                    if ($(nextRowCells[cellPos]).is('.mine')) {
                        mineCount++;
                    }
                    if ($(nextRowCells[cellPos + 1]).is('.mine')) {
                        mineCount++;
                    }
                }

                if (mineCount > 0) {
                    $cell.html('<i>' + mineCount + '</i>');
                    // Styling classes
                    var colorClass = countColors[mineCount];
                    $cell.addClass(colorClass);
                } else {
                    $cell.addClass('zero');
                }
            }
        }

        // Click cell to start game
        $('html').off('click', '#grid.unstarted .cell').on('click', '#grid.unstarted .cell', function (e) {
            $grid.removeClass('unstarted');
            if (unstarted && !$(e.target).is('.mine')) {
                layMines(level, $('.cell').index(this));
                timer = window.setInterval(startTimer, 1000);
                unstarted = false;
            }
        });

        /**
         * The function resets the timer to zero
         */
        function resetTimer() {
            $timer.html('000');
            time = 0;
        }
        /**
         * The function starts the timer by incrementing the time variable by one every second
         */
        function startTimer() {
            time++;
            if (time < 10) {
                $timer.html('00' + time);
            } else if (time > 9 && time < 100) {
                $timer.html('0' + time);
            } else {
                $timer.html(time);
            }
        }

        function stopTimer() {
            window.clearInterval(timer);
        }

        function pauseTimer() {
            stopTimer();
            pauseTime = parseInt($('#timer').html());
        }

        function unpauseTimer() {
            time = pauseTime;
            timer = window.setInterval(startTimer, 1000);
            pauseTime = false;
        }

        /* The above code is pausing the timer when the window is not in focus and unpausing the timer
        when the window is in focus. */
        $(window).on('blur', function () {
            pauseTimer();
        }).on('focus', function () {
            if (pauseTime) {
                unpauseTimer();
            }
        });

        /**
         * If the cell is not a mine and is not revealed, reveal it. If the cell is a zero, trigger a
         * click on it
         * @param  - The cell that was clicked
         */
        function checkCell($cell) {
            if (!$cell.is('.mine') && !$cell.is('.revealed')) {
                cellClick($cell, 'reveal');

                if ($cell.is('.zero')) {
                    $cell.trigger('click');
                }
            }
        }

        /**
         * If the user clicks on a cell, and the cell is not revealed, then the user can flag the cell.
         * If the user clicks on a cell, and the cell is revealed, then the user can clear the cell
         * @param  - The cell that was clicked
         * @param action - The action to be performed on the cell.
         * @returns the cellClick function.
         */
        function cellClick($cell, action) {
            // If Flagging
            if (action === 'flag' && !$cell.is('.revealed')) {
                if ($cell.is('.flagged')) {
                    $cell.removeClass('flagged');
                    $cell.addClass('maybe');
                    mineTally++;
                    updateMinecounter(mineTally);
                } else if ($cell.is('.maybe')) {
                    $cell.removeClass('maybe');
                    var flag = $cell.find('.flag');
                    flag.remove();
                } else {
                    $cell.addClass('flagged');
                    $cell.append('<span class="flag"></span>');
                    mineTally--;
                    updateMinecounter(mineTally);
                }
                // If Revealing
            } else if (action === 'reveal') {
                $cell.addClass('revealed');

                // If it's a mine you lose!
                if ($cell.is('.mine')) {
                    lose();
                }

                statusCheck();
            } else if (action === 'clear') {
                if (!$cell.is('.revealed') || $cell.is('.zero')) {
                    return;
                }

                clearClick($cell);
            }
        }

        /**
         * If the mine tally is less than 10, add a zero to the front of the mine tally and display it.
         * Otherwise, just display the mine tally
         * @param mineTally - the number of mines left to be flagged
         */
        function updateMinecounter(mineTally) {
            if (mineTally < 10) {
                $mineCounter.html('0' + mineTally);
            } else {
                $mineCounter.html(mineTally);
            }
        }

        /**
         * If the cell is clicked, check the cell to the left, right, top, bottom, and diagonals of the
         * cell
         * @param  - The cell that was clicked
         */
        function zeroClick($cell) {
            var cellPos = $cell.prevAll().length;
            var $currentRow = $cell.closest('.row');
            var rowPos = parseInt($currentRow.attr('data-row'));
            var rowCells = $currentRow.find('.cell');

            /* Checking the cell to the left and right of the cell that was clicked. */
            checkCell($(rowCells[cellPos - 1]));
            checkCell($(rowCells[cellPos + 1]));

            /* Checking the cells above the current cell to see if they are alive or dead. */
            if (rowPos > 0) {
                var prevRowCells = $($rows[rowPos - 1]).find('.cell');
                checkCell($(prevRowCells[cellPos - 1]));
                checkCell($(prevRowCells[cellPos]));
                checkCell($(prevRowCells[cellPos + 1]));
            }

            /* Checking the cells around the cell that was clicked. */
            if (rowPos < rows) {
                var nextRowCells = $($rows[rowPos + 1]).find('.cell');
                checkCell($(nextRowCells[cellPos - 1]));
                checkCell($(nextRowCells[cellPos]));
                checkCell($(nextRowCells[cellPos + 1]));
            }
        }

        // Clicking on a number to clear free cells
        function clearClick($cell) {
            var cellPos = $cell.prevAll().length;
            var $currentRow = $cell.closest('.row');
            var rowPos = parseInt($currentRow.attr('data-row'));
            var rowCells = $currentRow.find('.cell');
            var adjacentCells = [];
            var correctClear = true;
            var adjacentMines = 0;
            var adjacentFlags = 0;
            var i;
            /* Pushing the adjacent cells to the array. */
            adjacentCells.push($(rowCells[cellPos - 1]));
            adjacentCells.push($(rowCells[cellPos + 1]));

            /* Checking if the row position is greater than 0. If it is, it is pushing the previous row
            cells into the adjacentCells array. */
            if (rowPos > 0) {
                var prevRowCells = $($rows[rowPos - 1]).find('.cell');
                adjacentCells.push($(prevRowCells[cellPos - 1]));
                adjacentCells.push($(prevRowCells[cellPos]));
                adjacentCells.push($(prevRowCells[cellPos + 1]));
            }

            /* Checking if the row position is less than the number of rows. If it is, it is pushing
            the adjacent cells into an array. */
            if (rowPos < rows) {
                var nextRowCells = $($rows[rowPos + 1]).find('.cell');
                adjacentCells.push($(nextRowCells[cellPos - 1]));
                adjacentCells.push($(nextRowCells[cellPos]));
                adjacentCells.push($(nextRowCells[cellPos + 1]));
            }

            /* Checking the adjacent cells to see if they are mines or flags. */
            for (i = 0; i < adjacentCells.length; i++) {
                // add to mine count
                if ($(adjacentCells[i]).is('.mine')) {
                    adjacentMines++;
                }
                // add to flag cout
                if ($(adjacentCells[i]).is('.flagged')) {
                    adjacentFlags++;
                }
            }

            if (adjacentFlags === adjacentMines) {
                /* Checking if the adjacent cells are mines. If they are, it will reveal them. If they
                are flagged, it will continue. If they are flagged incorrectly, it will add the
                incorrect class and call the lose function. */
                for (i = 0; i < adjacentCells.length; i++) {
                    /* Checking if the adjacent cells are mines or flagged. If they are mines, it will
                    check if they are flagged. If they are flagged, it will continue. If they are
                    not flagged, it will add the class 'revealed' to the cell. If the adjacent cell
                    is flagged, it will add the class 'incorrect' to the cell and call the lose
                    function. */
                    if ($(adjacentCells[i]).is('.mine')) {
                        if ($(adjacentCells[i]).is('.flagged')) {
                            continue;
                        } else {
                            $(adjacentCells[i]).addClass('revealed');
                            correctClear = false;
                        }
                    } else if ($(adjacentCells[i]).is('.flagged')) {
                        correctClear = false;
                        $(adjacentCells[i]).addClass('incorrect');
                        lose();
                    }
                }

                /* Checking if the cell is a zero and if it is, it is calling the zeroClick function on
                it. */
                if (correctClear) {
                    for (i = 0; i < adjacentCells.length; i++) {
                        /* The above code is checking if the adjacent cell is a mine. If it is not, it
                        checks if the adjacent cell is a zero. If it is, it calls the zeroClick
                        function on that cell. If it is not a zero, it calls the cellClick function
                        on that cell. */
                        if (!$(adjacentCells[i]).is('.mine')) {
                            /* Checking if the adjacent cell is a zero. If it is, it calls the
                            zeroClick function on that cell. */
                            if ($(adjacentCells[i]).is('.zero')) {
                                zeroClick($(adjacentCells[i]));
                            }
                            cellClick($(adjacentCells[i]), 'reveal');
                        }
                    }
                }
            } else {
                return;
            }
        }

        /**
         * This function checks if the number of revealed cells is equal to the number of free cells.
         * If it is, it stops the timer, gets the time from the timer, adds the class 'disabled win' to
         * the grid, and resets the high score
         */
        function statusCheck() {
            if ($('.cell.revealed').length == freeCells) {
                stopTimer();
                var winTime = $('#timer').html();
                $grid.addClass('disabled win');
                resetHighScore(level, winTime);
            }
        }

        /**
         * The function lose() adds the class 'disabled lose' to the grid
         */
        function lose() {
            $grid.addClass('disabled lose');
            stopTimer();
        }

        // Clicking on a cell
        $('html').on('click', '.cell', function (e) {
            e.preventDefault();
            var action = 'reveal';
            var $cell = $(this);

            if (e.altKey || e.which === 3) {
                action = 'flag';
            } else if ($cell.is('.revealed') || e.which === 1 & e.which === 3) {
                action = 'clear';
            }

            /* Checking if the cell is flagged and if the alt key is not pressed. */
            if ($cell.is('.flagged') && !e.altKey) {
                return;
            }

            if ($cell.is('.zero')) {
                zeroClick($cell);
            }

            cellClick($cell, action);
        });

        /* Adding a class to the cell when the mouse is down and removing it when the mouse is up. */
        $('html').on('mousedown', '.cell:not(.revealed,.flagged)', function (e) {
            if (!e.altKey && e.which !== 3) {
                $(this).addClass('mousedown');
            }
        }).on('mouseup mouseleave', '.cell.mousedown', function () {
            $(this).removeClass('mousedown');
        });

        /**
         * If the level has a high score, and the winTime is less than the high score, then set the
         * high score to the winTime
         * @param level - the level the player is on
         * @param winTime - The time it took the player to win the game.
         */
        function resetHighScore(level, winTime) {
            /* Checking if the user has a high score for the current level. If they do, it checks if
            the current time is less than the high score. If it is, it updates the high score. If
            not, it does nothing. If the user does not have a high score, it sets the high score to
            the current time. */
            if (localStorage.getItem(level)) {
                if (winTime < localStorage.getItem(level)) {
                    localStorage.setItem(level, winTime);
                    populateHighScore(level, winTime, true);
                }
            } else {
                localStorage.setItem(level, winTime);
                populateHighScore(level, winTime, true);
            }
        }

        /**
         * It adds a leaderboard to the game if it doesn't already exist, and then adds the high score
         * to the leaderboard
         * @param level - beginner, intermediate, or expert
         * @param highScore - the high score to display
         * @param highlight - true/false
         */
        function populateHighScore(level, highScore, highlight) {
            /* Creating a leaderboard for the game. */
            if (!$('#leaderboard').length) {
                $board.find('.bottom').append('<div id="leaderboard"><h4>High Scores</h4><ul><li class="beginner"></li><li class="intermediate"></li><li class="expert"></li></ul><div><button id="score-reset" class="score-reset">Clear Scores</button></div></div>');
            }
            /* Highlighting the leaderboard. */
            if (highlight === true) {
                $('#leaderboard .highlight:not(.' + level + ')').removeClass('highlight');
                $('#leaderboard .' + level).addClass('highlight');
            }
            var highScoreDisplay = parseInt(highScore, 10);
            $('#leaderboard .' + level).html('<span>' + level + '</span>: ' + highScoreDisplay + ' seconds');
        }

        function clearScores() {
            localStorage.clear();
            $('#leaderboard').remove();
        }

        /* Listening for a click on the element with the id of score-reset. When that happens, it will
        call the clearScores function. */
        $('html').on('click', '#score-reset', clearScores);
    }

    _init();
});