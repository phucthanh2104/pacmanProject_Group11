"use strict";



function geronimo() {
	
	var mapConfig = "data/map.json";


	/* AJAX stuff */
	var getHighscore = () => {
		setTimeout(ajax_get, 30);
	}
	
		

		this.loadMapConfig = async () => {
			console.log('load map config');
			return new Promise((resolve, reject) => {
				$.ajax({
					url: mapConfig,
					beforeSend: function (xhr) {
						if (xhr.overrideMimeType) xhr.overrideMimeType("application/json");
					},
					dataType: "json",
					success: (data) => {
						console.log('map config loaded');
						game.map = data;
						resolve(data);
					},
					error: (response) => {
						console.error('error fetching map config');
						reject(response);
					}
				});
			})
		};

		this.getPillCount = () => {
			var temp = 0;
			$.each(this.map.posY, function (i, item) {
				$.each(this.posX, function () {
					if (this.type == "pill") {
						temp++;
						//console.log("Pill Count++. temp="+temp+". PillCount="+this.pillCount+".");
					}
				});
			});
			return temp;
		}

		this.init = async (state) => {

			console.log("init game " + state);

			// get Level Map
			this.map = await this.loadMapConfig();

			this.pillCount = this.getPillCount();

			// TODO: why are there 2 state checks?
			if (state === 0) {
				this.timer.reset();
				game.reset();
			}
			pacman.reset();

			game.drawHearts(pacman.lives);

			this.ghostFrightened = false;
			this.ghostFrightenedTimer = 240;
			this.ghostMode = 0; // 0 = Scatter, 1 = Chase
			this.ghostModeTimer = 200; // decrements each animationLoop execution

			// initalize Ghosts, avoid memory flooding
			if (pinky === null || pinky === undefined) {
				pinky = new Ghost(GHOSTS.PINKY, 7, 5, 'img/pinky.svg', 2, 2);
				inky = new Ghost(GHOSTS.INKY, 8, 5, 'img/inky.svg', 13, 11);
				blinky = new Ghost(GHOSTS.BLINKY, 9, 5, 'img/blinky.svg', 13, 0);
				clyde = new Ghost(GHOSTS.CLYDE, 10, 5, 'img/clyde.svg', 2, 11);
			} else {
				pinky.reset();
				inky.reset();
				blinky.reset();
				clyde.reset();
			}
			blinky.start(); // blinky is the first to leave ghostHouse
			inky.start();
			pinky.start();
			clyde.start();
		};

	}

geronimo();