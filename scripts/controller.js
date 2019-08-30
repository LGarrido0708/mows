// basic functionalities
$(document).ready(function () {

  client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");
  var data = '';
  var x = '';
  var con = false;
  var a = false;

  document.getElementById('btnSubscribe').addEventListener("click", function (e) {
    e.preventDefault();
    a = false;
    if (con == true) {
      if ($('#Subscribe-topic').val() == '') {
        alert('No Topic provided!')
      } else {
        client.subscribe($('#Subscribe-topic').val());
        data = 'You have subscribed to the topic ' + $('#Subscribe-topic').val();
        $('#span').html(data);
        x = $('#Subscribe-topic').val();
      }
    } else {
      alert('Connect first!');
    }
  })

  document.getElementById('btnUnsubscribe').addEventListener("click", function (e) {
    e.preventDefault();
    a = true;
    $('#table').html('');
    $('#span').html('');
    $('#Subscribe-topic').val('');
  })


  client.publish("mqtt/demo", "hello world!");

  document.getElementById('btnConnect').addEventListener("click", function (e) {
    e.preventDefault();
    con = true;
    client.on("connect", function () {
      console.log("Successfully connected");
    })
    $('#btnSubscribe').attr('disabled',false);
  })

  document.getElementById('btnDisconnect').addEventListener("click", function (e) {
    e.preventDefault();
    data = '';
    console.log('You are disconnected.');
    client.end();
    $('#span').html(data);
    $('#Subscribe-topic').val('');
    $('#Publish-topic').val('');
    $('#Publish-payload').val('');
    $('#btnSubscribe').attr('disabled',true);
  })

  document.getElementById('btnPublish').addEventListener("click", function (e) {
    e.preventDefault();
    console.log('Published.');
    if (a == true) {
      alert('Subscribe first!')
    } else
      if (con == true) {
        if ($('#Publish-topic').val() == '' && $('#Publish-payload').val() == '') {
          alert('No Topic provided!')
        } else {
          client.on("message", function (topic, payload) {
            console.log($('#Publish-topic').val(), $('#Publish-payload').val());
          })
          client.publish($('#Publish-topic').val(), $('#Publish-payload').val());
          if (x == $('#Publish-topic').val()) {
            var dt = new Date();
            var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
            $('table').append('<tr><td>'+$('#Publish-topic').val()+'</td><td>'+$('#Publish-payload').val()+'</td><td>'+time+'</td></tr>');
          }
        }
      } else {
        alert('Subscribe first!')
      }
  })

  // // advance functionalities
  // client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
  // client.subscribe("mqtt/demo", function (err){
  //   if (err){
  //     console.log(err);
  //   } else {
  //     console.log("subscribed")
  //   }
  // })

  // client.on("connect", function(){
  //     console.log("Successfully connected");
  // })

  // client.on("message", function (topic, payload) {
  //   console.log([topic, payload].join(": "));
  //   client.end();
  // })

  // client.publish("mqtt/demo", "hello world!", function(err){
  //   if (err){
  //     console.log(err)
  //   } else {
  //     console.log("published")
  //   }
  // })
});