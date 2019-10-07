//Check off specific todos by clicking

$('ul').on("click", "li", function(){
   $(this).toggleClass("completed");
});

//click on x to delete todo
//event is an event object

$("ul").on("click","span",function(event){

    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });

    //stops the up bubble effect (fire parent listeners)
   
    event.stopPropagation();
});

$("input[type='text']").keypress(function(event){
  if(event.which == 13){
    var toDoText =  $(this).val();
    $(this).val("");
    $('ul').append("<li><span><i class='fa fa-trash'></i></span>" + toDoText + "</li>")
  }  
});

$(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle();
});