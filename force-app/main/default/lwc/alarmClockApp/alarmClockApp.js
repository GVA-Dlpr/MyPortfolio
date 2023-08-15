import { LightningElement } from 'lwc';
import AlarmClockAssets from '@salesforce/resourceUrl/AlarmClockAssets'
export default class AlarmClockApp extends LightningElement {
    clockImage = AlarmClockAssets+'/AlarmClockAssets/clock.png'
    ringtone  = new Audio (AlarmClockAssets+'/AlarmClockAssets/Clocksound.mp3')
    currentTime = ''
    hours = []
    minutes= []

    hourSelected
    minSelected
    meridinSelected=''
    alarmTime
    isAlarmSet = false
    isAlarmTriggered= false

    get isFieldNotSelected(){
        return !(this.hourSelected && this.minSelected && this.meridinSelected)
    }

    get shakeImage(){
        return this.isAlarmTriggered ? 'shake':''
    }

    connectedCallback(){
        this.currentTimeHandler()
        this.createHoursOptions()
        this.createMinutesOptions()
    }

    currentTimeHandler(){
        setInterval(()=>{

        let dateTime = new Date();
        let hour = dateTime.getHours()
        let min = dateTime.getMinutes()
        let sec = dateTime.getSeconds()
        let ampm = "AM"
        if(hour == 0){
            hour=12;
        }else if(hour>=12){
            hour=hour-12
            ampm='PM'
        }
        hour = hour<10 ? "0"+hour : hour
        min = min<10 ? "0"+min : min
        sec = sec<10 ? "0"+sec : sec

        this.currentTime = `${hour}:${min}:${sec} ${ampm}`

        if(this.alarmTime === `${hour}:${min} ${ampm}`){
            console.log("Alarm Trigerred")
            this.isAlarmTriggered=true
            this.ringtone.play()
            this.ringtone.loop=true
        }

        }, 1000) 
    }

    createHoursOptions(){
        for(let i=1;i<=12;i++){
            let val = i<10 ? "0"+i: i 
            this.hours.push(val)
        }
    }

    createMinutesOptions(){
        for(let i=0;i<=59;i++){
            let val = i<10 ? "0"+i: i 
            this.minutes.push(val)
        }
    }

    optionhandler(event){
        const {label,value}=event.detail
        if(label==="Hour(s)"){
            this.hourSelected = value
        }else if(label==="Minute(s)"){
            this.minSelected = value
        }
        console.log(this.hourSelected)
        console.log(this.minSelected)
    }

    ampmchange(event){
        const {name,value}=event.target
        console.log("Bakchodi")
        console.log("event.target",event.target)
        this.meridinSelected=value;

        // if(name==="am"){
        //     this.meridinSelected="AM";
        // }
        // else if(name==='pm'){
        //     this.meridinSelected=value;
        // }
        console.log(this.meridinSelected)
    }

    setAlarmHandler(){
        this.alarmTime = `${this.hourSelected}:${this.minSelected} ${this.meridinSelected}`
        this.isAlarmSet=true
    }

    clearAlarmHandler(event){
        this.isAlarmSet = false
        this.alarmTime = ''
        this.isAlarmTriggered=false
        const elemets = this.template.querySelectorAll('c-clock-dropdown')
        Array.from(elemets).forEach(elemet=>{
            elemet.reset('')
        })
        const val = event.target
        this.meridinSelected= val
        this.ringtone.pause() 
    }
} 