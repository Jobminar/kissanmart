import { Component ,OnInit} from '@angular/core';
import { Location } from '@angular/common';


  interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  }
};

@Component({
  selector: 'app-office-location',
  templateUrl: './office-location.component.html',
  styleUrl: './office-location.component.css'
})
export class OfficeLocationComponent implements OnInit{
  constructor(private location:Location) {}
  goToPreviousPage(): void {
    this.location.back();
  }
  ngOnInit(): void {
    
  }

  center: google.maps.LatLngLiteral = {
    lat: 17.32281823869329, 
    lng: 78.5569891719934 
  };

  zoom = 15;
  display: any;
  destinationMarker: google.maps.Marker | undefined;
  destination = {lat:17.32281823869329 , lng:78.5569891719934 };

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.center = event.latLng.toJSON();
      this.placeDestinationMarker(event.latLng);
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  
  private placeDestinationMarker(latLng: google.maps.LatLng) {
    if (this.destinationMarker) {
      this.destinationMarker.setPosition(latLng);
    } else {
      this.destinationMarker = new google.maps.Marker({
        position: latLng,
        title: 'kissan Mart',
        icon: 'assets/profile/gps-navigation.png' // Replace with the path to your custom icon
      });
    }
  }

  markers: MarkerProperties[] = [
    { position: { lat:17.32281823869329 , lng:78.5569891719934 }}
  ]

}
