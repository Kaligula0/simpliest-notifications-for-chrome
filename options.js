var timerDelayUnits = 60000;
function getTimerDelayUnits() {
	timerDelayUnits = ((+localStorage['FBnotifier-settings-TimerDelayUnits'])||60000);
	var a=Math.log(timerDelayUnits/1000)/Math.log(60); // = log_[60](timerDelayUnits/1000)
	document.querySelector('#TimerDelayUnits').options[a].selected = true;
}
function setTimerDelayUnits() {
	var a = document.querySelector('#TimerDelayUnits').selectedIndex;
	timerDelayUnits=1000*Math.pow(60,a);
	localStorage['FBnotifier-settings-TimerDelayUnits'] = timerDelayUnits;
}

function read(el){
	var sett = localStorage['FBnotifier-settings-'+el.name];
	if (sett){
		sett = ( sett=='true' ? true : (sett=='false'?false:sett) );
		
		if (el.type=='checkbox') {
			el.checked = sett;
		}
		else if (el.type=='text' && sett!=undefined) {
			if (el.name=='TimerDelay') sett/=timerDelayUnits;
			el.value = sett;
		}
	}
}

function save() {
	if ( this.type=='checkbox' ) {
		localStorage['FBnotifier-settings-'+this.name] = this.checked?true:false;
	} else if ( this.type=='text' ) {
		if ( this.name=='TimerDelay' ) {
			localStorage['FBnotifier-settings-'+this.name] = this.value.replace(/,/,'.').replace(/[^\.\d]/g,'').replace(/(\d+(?:\.(?:\d+)?)?).*/,'$1')*timerDelayUnits;
		} else {
			localStorage['FBnotifier-settings-'+this.name] = this.value;
		}
	}
}

function options(){
	getTimerDelayUnits();
	var a = document.getElementsByTagName('input');
	for (i=0;i<a.length;i++){
		a[i].addEventListener( (a[i].type=='checkbox'?'click':'change') , save , false );
		read(a[i]);
	}
	document.querySelector('#timerDelayUnits').addEventListener( 'change' , function(){
		setTimerDelayUnits(this);
	} , false );
}

window.onload=options;