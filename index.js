class Dino {
  constructor(elemento){
    this.posicaoInicial = 200;
    this.posicao = this.posicaoInicial;
    this.elemento = elemento;
    this.pulou=false;
    this.abaixou=false;
  }
  pular(){
    this.elemento.src="https://i.imgur.com/NruXRJJ.gif"
    this.posicao -= 60;
    this.pulou=true;
    this.atualizar();
    setTimeout(ok => {
      this.posicao = this.posicaoInicial;
      this.pulou=false;
      this.atualizar()
      
    }, 500);
  }
  
  baixar(){
    this.elemento.src="https://i.imgur.com/iTTr1Yu.gif";
    this.posicao=this.posicaoInicial;
    this.abaixou = true;
    this.atualizar()
    setTimeout(ok =>{
      this.elemento.src="https://i.imgur.com/NruXRJJ.gif"
      this.abaixou = false;
    },700)
  }

  atualizar() {
      this.elemento.style.top = this.posicao + "px";
  }
}

class Cenario {
  constructor(elemento){
    this.posicaoInicial=0
    this.posicao=this.posicaoInicial
    this.elemento=elemento
    this.cenario_andando=null;
  }

  andar(){
    this.cenario_andando = setInterval(ok=>{
      if(this.posicao<1500){
        this.posicao+=2;
        this.atualizar()}
      else{
        this.posicao=this.posicaoInicial;
        this.atualizar()}
    },1)
  }
   
  parar(){
    clearInterval(this.cenario_andando);
  }
   
  atualizar() {
      this.elemento.style.right = this.posicao + "px";
  }
}

class Obstaculo {
  constructor(dino){
    this.posicaoInicial= window.innerWidth + 50;
    this.posicao=this.posicaoInicial;
    this.elemento = document.createElement("img");
    this.dino=dino;
    this.objeto_na_tela=false;
    this.obstaculos_possiveis=[{tipo:"cacto", src:"https://i.imgur.com/hIqLGMo.png",top: "125", dino: "pule", largura: 22},
    {tipo:"cacto", src:"https://i.imgur.com/568Xa6i.png",top: "125", dino: "pule", largura: 17},
    {tipo:"cacto", src:"https://i.imgur.com/yHQ5vnZ.png",top: "125", dino: "pule", largura: 23},
    {tipo:"cacto", src:"https://i.imgur.com/z1CrlVV.png",top: "125", dino: "pule", largura: 41},
    {tipo:"cacto", src:"https://i.imgur.com/UqUIays.png",top: "125", dino: "pule", largura: 64},
    {tipo:"pterodactil", src:"https://i.imgur.com/am7mrT6.gif", top: "90", dino: "abaixe", largura: 42},
    {tipo:"pterodactil", src:"https://i.imgur.com/am7mrT6.gif", top: "125", dino: "pule", largura: 42}];
  }

  sortear(){
    var novo_obstaculo=this.obstaculos_possiveis[Math.floor(Math.random() * this.obstaculos_possiveis.length)];
    return novo_obstaculo
  }

  por_obstaculo(){
    this.adicionar();
    var obstaculo_da_vez=this.sortear();
    this.elemento.src=obstaculo_da_vez.src;
    this.elemento.style.top=obstaculo_da_vez.top + "px";
    this.objeto_na_tela = true;
    this.acompanhar_chao(obstaculo_da_vez);
  }

  acompanhar_chao(obstaculo_da_vez){
    var acompanhando_chao = setInterval(ok=>{
      if(this.posicao > -60 ){
        if (this.posicao <= 242 && this.posicao >= 200 - obstaculo_da_vez.largura && obstaculo_da_vez.dino == "pule" && this.dino.pulou === false){
          clearInterval(acompanhando_chao)
          game_over();
        }
        else if (this.posicao <= 242 && this.posicao >= 200 - obstaculo_da_vez.largura &&   obstaculo_da_vez.dino == "abaixe" && this.dino.abaixou === false){
          clearInterval(acompanhando_chao)
          game_over();
        }
        else{
          this.posicao-=2;
          this.atualizar()
        }
      }
      else{
        this.remover();
        this.posicao=this.posicaoInicial;
        clearInterval(acompanhando_chao);
        this.objeto_na_tela=false;
      }
    },5)
  }
  
  adicionar(){
    document.body.appendChild(this.elemento);
    this.elemento.style.position="relative";
    this.elemento.style.left=this.posicaoInicial +"px";
  }
    
  remover(){
    document.body.removeChild(this.elemento);
  }

  atualizar() {
      this.elemento.style.left = this.posicao + "px";
  }
}

elementoDino = document.getElementById("dino");
dino = new Dino(elementoDino);

elementoCenario=document.getElementById("cenario");
cenario = new Cenario(elementoCenario);
cenario.andar();

obstaculo = new Obstaculo(dino);
var chamar_obstaculo = setInterval(ok => {
  if (obstaculo.objeto_na_tela === false){
    obstaculo.por_obstaculo()
  }}, 2000);

var pontuacao=0;
var contador_de_pontos= setInterval(ok =>{pontuacao++;
pontuacao_mostrada=document.getElementById("pontuacao");
pontuacao_mostrada.style.left=window.innerWidth - 200 + "px"
pontuacao_mostrada.innerHTML=pontuacao;},100);


function trataTeclado(){
  switch(event.keyCode) {
    case 32: { //cima com seta
      dino.pular();
      break;
    }
    case 40: { //baixo
      dino.baixar()
      break;
    }
  }
}

function game_over(){
  cenario.parar()
  dino.elemento.src="https://i.imgur.com/8lELacL.png";
  var img_game_over= document.createElement("img");
  document.body.appendChild(img_game_over);
  img_game_over.style.position="relative";
  img_game_over.src="https://i.imgur.com/69XYVlD.png";
  img_game_over.style.top=40+"px";
  img_game_over.style.left=((window.innerWidth / 2) - 169) + "px";
  clearInterval(contador_de_pontos);
  clearInterval(chamar_obstaculo);
}

