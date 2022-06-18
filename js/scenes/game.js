class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
    }

    preload (){	
		this.load.image('back', '../resources/back.png');
		this.load.image('cb', '../resources/cb.png');
		this.load.image('co', '../resources/co.png');
		this.load.image('sb', '../resources/sb.png');
		this.load.image('so', '../resources/so.png');
		this.load.image('tb', '../resources/tb.png');
		this.load.image('to', '../resources/to.png');
	}
	
    create (){	
		let parejas = ['cb', 'cb', 'co', 'co', 'sb', 'sb', 'so', 'so', 'tb', 'tb','to', 'to'];
		//var rand = Math.floor(Math.random() * parejas.length);
		var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
		var options_data = JSON.parse(json);
		var cartas = options_data.cards*2;
		var dific = options_data.dificulty;
		let vectorcartas = parejas.slice(0, cartas);
		this.cameras.main.setBackgroundColor(0xBFFCFF);
		
		
		

		var tiempo_restante = null;
		var puntos_perdidos = null;

		if(dific == "hard"){
			tiempo_restante = 1000;
			puntos_perdidos = 20;

		}
		else if(dific == "normal"){
			tiempo_restante = 1500;
			puntos_perdidos = 15;

		}
		else{
			tiempo_restante = 2000;
			puntos_perdidos = 10;

		}

		
		this.cards = this.physics.add.staticGroup();

		vectorcartas.sort(function(){return Math.random() - 0.5});

		for(var k = 0; k < cartas; k++){

			
            this.add.image(125*k+50,300,vectorcartas[k]);
            this.cards.create(125*k+50,300,'back');
			

        }
		

		
		let i = 0;
		this.cards.children.iterate((card)=>{
			card.card_id = vectorcartas[i];
			i++;
			card.setInteractive();
			card.on('pointerup', () => {
				card.disableBody(true,true);

				if (this.firstClick){
					if (this.firstClick.card_id !== card.card_id){
						this.score -= puntos_perdidos;
						this.firstClick.enableBody(false, 0, 0, true, true);
						card.enableBody(false, 0, 0, true, true);

						var error = [];
						var cont = 0;
						for(let j = 0; j < cartas*2; j++){
							let cartas_error = this.add.image(125*j+50,300,vectorcartas[cont]);
						
							error.push(cartas_error);
							cont++;
							
							
						}
						setTimeout(() =>{
							for (let i = 0; i < cartas*2; i++){
								error[i].destroy();
							}
						},tiempo_restante);

						
						/*this.cards.children.each(function(card) {
							card.disableBody(true,true);
						}, this);

						this.cards.children.each(function(card) {
							card.enableBody(false, 0,0, true, true);

						}, this);*/

						if (this.score <= 0){
							alert("Game Over");
							const againbuttton = this.add.text(100, 600, 'JUGAR DE NUEVO', { fill: '#f0f' });
							againbuttton.style.fontSize = "50px";
							againbuttton.setInteractive()
      						.on('pointerdown', () => this.playagain());
							
							//playagain();
						}
					}
					else{
						this.correct++;
						var contador_partidas = 0;
						var arrayjugadores = []

						if (this.correct >= options_data.cards){
							alert("You Win with " + this.score + " points.");
							contador_partidas++;
							this.data.set('puntos', this.score);

							//loadpage("../index.html");
						
							const againbuttton = this.add.text(100, 600, 'JUGAR DE NUEVO', { fill: '#f0f' });
							againbuttton.style.fontSize = "50px";
							againbuttton.setInteractive()
      						.on('pointerdown', () => this.playagain());
							var text = this.add.text(100, 100, '', { font: '64px Impact', fill: '#020202' });
							text.setText([
								'¡VICTORIA! Tu puntuacion: ' + this.data.get('puntos')
							]);
							arrayjugadores = this.score;
							localStorage.setItem('puntuacion', JSON.stringify(arrayjugadores));
							var array = localStorage.getItem('myArray');
							array = JSON.parse(arrayjugadores);

					}}
					

					this.firstClick = null;
					
				}
				else{
					this.firstClick = card;
				}
			}, card);
		});
	}

		playagain(){
		loadpage("../html/phasergame.html");
	}
	
	update (){	}
}

