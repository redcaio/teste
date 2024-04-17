// Carrega o arquivo JSON e processa os dados
$.getJSON("Academias.json", function(data) {
    // Extrair valores de latitude e longitude
    var latitudes = [];
    var longitudes = [];
    var nomesPolos = [];
    var nomeRua = [];
    var nomeBairro = [];
    var complemento = [];

  
    // Iterar sobre os registros
    for (var i = 0; i < data.records.length; i++) {
      var record = data.records[i];
      // Índice 7 é a latitude e índice 8 é a longitude, conforme definido no JSON
      latitudes.push(record[7]);
      longitudes.push(record[8]);
      nomesPolos.push(record[1]);
      nomeRua.push(record[3]);
      nomeBairro.push(record[4]);
      complemento.push(record[5]);
    }
  
    // Inicializar o mapa
    var map = L.map('map').setView([-8.047562, -34.877002], 13); // Definir coordenadas de visualização inicial
  
    // Adicionar camada de azulejos para o mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    // Iterar sobre as latitudes e longitudes para adicionar marcadores ao mapa
    for (var i = 0; i < latitudes.length; i++) {
      var marker = L.marker([latitudes[i], longitudes[i]]).addTo(map);
      // Concatene as informações em uma única string para usar como conteúdo do popup
      var popupContent = "Nome do Polo: " + nomesPolos[i] + "<br>" +
                         "Rua: " + nomeRua[i] + "<br>" +
                         "Bairro: " + nomeBairro[i] + "<br>" +
                         "Complemento: " + complemento[i];
      // Associe a string ao popup do marcador
      marker.bindPopup(popupContent);
    }

    // Obter a localização em tempo real do usuário
      var userMarker;
      navigator.geolocation.watchPosition(function(position) {
      var userLat = position.coords.latitude;
      var userLng = position.coords.longitude;
  
      // Definir o ícone personalizado para o marcador da localização do usuário
      var customIcon = L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });

      // Adicionar um marcador para a localização do usuário
      if (!userMarker) {
        userMarker = L.marker([userLat, userLng], { icon: customIcon }).addTo(map);
        userMarker.bindPopup("Sua Localização").openPopup();
      } else {
        userMarker.setLatLng([userLat, userLng]);
      }
  
      // Ajustar a visualização do mapa para a localização do usuário
      map.setView([userLat, userLng], 13);
    });
  });