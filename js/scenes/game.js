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
		var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
		var options_data = JSON.parse(json);
		var cartas = options_data.cards*2;
		let vectorcartas = parejas.slice(0, cartas);
		this.cameras.main.setBackgroundColor(0xBFFCFF);
		
		vectorcartas.sort(function(){return Math.random() - 0.5});
		
		this.cards = this.physics.add.staticGroup();

		
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
						this.score -= 20;
						this.firstClick.enableBody(false, 0, 0, true, true);
						card.enableBody(false, 0, 0, true, true);
						this.cards.children.each(function(card) {
							card.disableBody(true,true);
						}, this);

						this.cards.children.each(function(card) {
							card.enableBody(false, 0,0, true, true);

						}, this);
						if (this.score <= 0){
							alert("Game Over");
							//loadpage("../");
						}
					}
					else{
						this.correct++;

						if (this.correct >= options_data.cards){
							alert("You Win with " + this.score + " points.");
							//loadpage("../");
						}
					}
					this.firstClick = null;
				}
				else{
					this.firstClick = card;
				}
			}, card);
		});
	}
	
	update (){	}
}

