package com.example.demo.controllers;

import com.example.demo.models.entities.Places;
import com.example.demo.services.PlacesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PlacesController {

    @Autowired
    PlacesService placesService;

    @GetMapping("/GetPlacesByPlacename")
    public List<Places> GetPlacesBySubstring(@RequestParam String placename, @RequestParam int resultsPerPage, @RequestParam int page) {
        return placesService.GetPlacesByPlacenameSubstring(placename, resultsPerPage, page);
    }

}
