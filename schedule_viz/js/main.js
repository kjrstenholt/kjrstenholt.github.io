// Check all the boxes first



$( document ).ready(function() {
    $("#faculty input").prop( "checked", true );
    $(".instructors").toggle();
});

//Toggle visibility of each faculty member on checkbox change

$('#lucie').click(function() {
    $(".lucie_wrapper").toggle(this.checked);
    $(".lucie_wrapper .class-box").show();
});

// $('#steph').click(function() {
//     $(".steph_wrapper").toggle(this.checked);
//     $(".steph_wrapper .class-box").show();
// });

$('#bill').click(function() {
    $(".bill_wrapper").toggle(this.checked);
    $(".bill_wrapper .class-box").show();
});

$('#kjrsten').click(function() {
    $(".kjrsten_wrapper").toggle(this.checked);
    $(".kjrsten_wrapper .class-box").show();
});

$('#dennis').click(function() {
    $(".dennis_wrapper").toggle(this.checked);
    $(".dennis_wrapper .class-box").show();
});

$('#carl').click(function() {
    $(".carl_wrapper").toggle(this.checked);
    $(".carl_wrapper .class-box").show();
});

$('#sam').click(function() {
    $(".sam_wrapper").toggle(this.checked);
    $(".sam_wrapper .class-box").show();
});

$('#will').click(function() {
    $(".will_wrapper").toggle(this.checked);
    $(".will_wrapper .class-box").show();
});


function hideAll() {
	$("#faculty input").prop( "checked", false );
	$(".instructors").hide();
}

function showAll() {
	$("#faculty input").prop( "checked", true );
	$(".instructors").show();
	$(".instructors .class-box").show(); 
}

//HIDE BUTTON
$('#hide').click(function() {
    hideAll();
});

//SHOW BUTTON
$('#show').click(function() {
    showAll();
});


$('#t4510').click(function() {
	showAll();
	$(".instructors .class-box").hide(); //go a level deeper to hide other rooms
    $(".instructors .room_t4510").show(); //show only T.4510 classes
});

$('#t4520').click(function() {
	showAll();
	$(".instructors .class-box").hide(); //go a level deeper to hide other rooms
    $(".instructors .room_t4520").show(); //show only T.4520 classes
});

$('#t4530').click(function() {
	showAll();
	$(".instructors .class-box").hide(); //go a level deeper to hide other rooms
    $(".instructors .room_t4530").show(); //show only T.4530 classes
});

$('#t4540').click(function() {
	showAll();
	$(".instructors .class-box").hide(); //go a level deeper to hide other rooms
    $(".instructors .room_t4540").show(); //show only T.4540 classes
});

$('#t4550').click(function() {
	showAll();
	$(".instructors .class-box").hide(); //go a level deeper to hide other rooms
    $(".instructors .room_t4550").show(); //show only T.4550 classes
});
