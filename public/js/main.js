
(function ($) {
    "use strict";
        var optionsVal = document.getElementById('sel1');
        var input = document.getElementById('cat1');
        var uri12='https://api.cloudinary.com/v1_1/bobby667788/upload';
        var uppri12='xjmhbfai';//provide your uri here
    
        var fileup12=document.getElementById('file-upload');
     
        var tx1=document.getElementById('t3');
   
        var imgt=document.getElementById("imgauto");
    
        var fileup13=document.getElementById('file-upload1');
        var tx2=document.getElementById('parat1');
    
        var fileup14=document.getElementById('file-upload2');
        var tx3=document.getElementById('parat2');
    
        var fileup15=document.getElementById('file-upload3');
        var tx4=document.getElementById('parat3');
    
        var fileup154=document.getElementById('file-upload4');
        var tx44=document.getElementById('parat4');
    
        var fileup155=document.getElementById('file-upload5');
        var tx45=document.getElementById('parat5');
    
        var fileup156=document.getElementById('file-upload6');
        var tx46=document.getElementById('parat6');
    
        var fileup157=document.getElementById('file-upload7');
        var tx47=document.getElementById('parat7');
    
        var fileup158=document.getElementById('file-upload8');
        var tx48=document.getElementById('parat8');
    
        var fileup159=document.getElementById('file-upload9');
        var tx49=document.getElementById('parat9');
        
        
        fileup12.addEventListener('change',(event)=>{
            var file12=event.target.files[0];
            var formdata12=new FormData();
            formdata12.append('file',file12);
            formdata12.append('upload_preset',uppri12);

            axios({
                url:uri12,
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:formdata12
            }).then((res)=>{
                console.log(res.data.url);
                tx1.disabled=false;
                tx1.value=res.data.url;
                $('#imgauto').html('<img src="' + res.data.url + '" style="padding:10px;margin-bottom:6%;height:300px;width:500px;"/>');
            }).catch((err)=>{
                console.log(err);
            });
        });
            

        fileup13.addEventListener('change',(event)=>{
            var file13=event.target.files[0];
            var formdata13=new FormData();
            formdata13.append('file',file13);
            formdata13.append('upload_preset',uppri12);

            axios({
                url:uri12,
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:formdata13
            }).then((res)=>{
                console.log(res.data.url);
                tx2.value=res.data.url;
                $('#imgauto1').html('<img src="' + res.data.url + '" style="padding:10px;margin-bottom:6%;height:300px;width:500px;"/>');
            }).catch((err)=>{
                console.log(err);
            });
        });
        
  
        fileup14.addEventListener('change',(event)=>{
            var file14=event.target.files[0];
            var formdata14=new FormData();
            formdata14.append('file',file14);
            formdata14.append('upload_preset',uppri12);

            axios({
                url:uri12,
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:formdata14
            }).then((res)=>{
                console.log(res.data.url);
                tx3.value=res.data.url;
                $('#imgauto2').html('<img src="' + res.data.url + '" style="padding:10px;margin-bottom:6%;height:300px;width:500px;"/>');
            }).catch((err)=>{
                console.log(err);
            });
        });
        
 
        fileup15.addEventListener('change',(event)=>{
            var file15=event.target.files[0];
            var formdata15=new FormData();
            formdata15.append('file',file15);
            formdata15.append('upload_preset',uppri12);

            axios({
                url:uri12,
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:formdata15
            }).then((res)=>{
                console.log(res.data.url);
                tx4.value=res.data.url;
                $('#imgauto3').html('<img src="' + res.data.url + '" style="padding:10px;margin-bottom:6%;height:300px;width:500px;"/>');
            }).catch((err)=>{
                console.log(err);
            });
        });
    
    fileup154.addEventListener('change',(event)=>{
            var file154=event.target.files[0];
            var formdata154=new FormData();
            formdata154.append('file',file154);
            formdata154.append('upload_preset',uppri12);

            axios({
                url:uri12,
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:formdata154
            }).then((res)=>{
                console.log(res.data.url);
                tx44.value=res.data.url;
                $('#imgauto4').html('<img src="' + res.data.url + '" style="padding:10px;margin-bottom:6%;height:300px;width:500px;"/>');
            }).catch((err)=>{
                console.log(err);
            });
        });
    
    fileup155.addEventListener('change',(event)=>{
            var file155=event.target.files[0];
            var formdata155=new FormData();
            formdata155.append('file',file155);
            formdata155.append('upload_preset',uppri12);

            axios({
                url:uri12,
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:formdata155
            }).then((res)=>{
                console.log(res.data.url);
                tx45.value=res.data.url;
                $('#imgauto5').html('<img src="' + res.data.url + '" style="padding:10px;margin-bottom:6%;height:300px;width:500px;"/>');
            }).catch((err)=>{
                console.log(err);
            });
        });
    
    fileup156.addEventListener('change',(event)=>{
            var file156=event.target.files[0];
            var formdata156=new FormData();
            formdata156.append('file',file156);
            formdata156.append('upload_preset',uppri12);

            axios({
                url:uri12,
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:formdata156
            }).then((res)=>{
                console.log(res.data.url);
                tx46.value=res.data.url;
                $('#imgauto6').html('<img src="' + res.data.url + '" style="padding:10px;margin-bottom:6%;height:300px;width:500px;"/>');
            }).catch((err)=>{
                console.log(err);
            });
        });
    
    fileup157.addEventListener('change',(event)=>{
            var file157=event.target.files[0];
            var formdata157=new FormData();
            formdata157.append('file',file157);
            formdata157.append('upload_preset',uppri12);

            axios({
                url:uri12,
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:formdata157
            }).then((res)=>{
                console.log(res.data.url);
                tx47.value=res.data.url;
                $('#imgauto7').html('<img src="' + res.data.url + '" style="padding:10px;margin-bottom:6%;height:300px;width:500px;"/>');
            }).catch((err)=>{
                console.log(err);
            });
        });
    
    fileup158.addEventListener('change',(event)=>{
            var file158=event.target.files[0];
            var formdata158=new FormData();
            formdata158.append('file',file158);
            formdata158.append('upload_preset',uppri12);

            axios({
                url:uri12,
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:formdata158
            }).then((res)=>{
                console.log(res.data.url);
                tx48.value=res.data.url;
                $('#imgauto8').html('<img src="' + res.data.url + '" style="padding:10px;margin-bottom:6%;height:300px;width:500px;"/>');
            }).catch((err)=>{
                console.log(err);
            });
        });
    
    fileup159.addEventListener('change',(event)=>{
            var file159=event.target.files[0];
            var formdata159=new FormData();
            formdata159.append('file',file159);
            formdata159.append('upload_preset',uppri12);

            axios({
                url:uri12,
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:formdata159
            }).then((res)=>{
                console.log(res.data.url);
                tx49.value=res.data.url;
                $('#imgauto9').html('<img src="' + res.data.url + '" style="padding:10px;margin-bottom:6%;height:300px;width:500px;"/>');
            }).catch((err)=>{
                console.log(err);
            });
        });
         

        optionsVal.onclick = function(){
        setVal(this);
        };
        
        function setVal(selectedVal){
         input.value = selectedVal.value;
        }
    
    
    
     $.fn.showHide = function (options) {

		//default vars for the plugin
        var defaults = {
            speed: 1000,
			easing: '',
			changeText: 0,
			showText: 'Show',
			hideText: 'Hide'
			
        };
        var options = $.extend(defaults, options);

        $(this).click(function () {	
           
             $('.toggleDiv').slideUp(options.speed, options.easing);	
			 // this var stores which button you've clicked
             var toggleClick = $(this);
		     // this reads the rel attribute of the button to determine which div id to toggle
		     var toggleDiv = $(this).attr('rel');
		     // here we toggle show/hide the correct div at the right speed and using which easing effect
		     $(toggleDiv).slideToggle(options.speed, options.easing, function() {
		     // this only fires once the animation is completed
			 if(options.changeText==1){
		     $(toggleDiv).is(":visible") ? toggleClick.text(options.hideText) : toggleClick.text(options.showText);
			 }
              });
		   
		  return false;
		   	   
        });

    };
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });
    
     $('.show_hide').showHide({			 
		speed: 1000,  	
		easing: '',  
		changeText: 1, 
		showText: 'View',
		hideText: 'Close' 				 
	   }); 


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });
    

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }


})(jQuery);