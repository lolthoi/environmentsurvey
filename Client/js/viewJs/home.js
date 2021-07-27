
$(document).ready(function(){
	var owl = $('.owl-carousel');
	owl.owlCarousel({
		items:3,
		loop: true,
		margin:10,
		autoplay:true,
		autoplayTimeout:2000,
		autoplayHoverPause:true,
		
	});
})


function showMessageOutput(count) {
	  	    	
    $('.owl-carousel').owlCarousel('add', '<div class="item item_'+count+'">'
           +'<h4 class="station_name">'+messageOutput.station.name+'</h4>	'	
           +'<div class="table-responsive">'
               
           +'</div>'
       +'</div>'
       );
//     var index = 0;
//     Object.keys(messageOutput.detail).map(key=> {   		 
       
//         if(messageOutput.detail[key] == 1){
// // 	    		console.log('#detail_'+count);
//     		$('#detail_'+count).append('<tr id="' +count +'_'+index +'">'
//                     +'<td >' + key + '</td>'
//                     +'<td class="icon-checkmark-circle2 text-center " ></td>'
//                     +'</tr>');
//     	}else{
// // 	    		console.log('#detail_'+count);
//     		$('#detail_'+count).append(`<tr id="` +count +`_`+index +`">`
//                     +'<td >' + key + '</td>'
//                     +'<td class="icon-cancel-circle2 text-center"   ></td>'
//                     +'</tr>');	    		
//     	}
//         index++;
//    })
   $('.owl-carousel').owlCarousel('refresh');
     
}