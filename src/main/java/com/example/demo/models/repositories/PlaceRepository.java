package com.example.demo.models.repositories;

import com.example.demo.models.entities.Places;
import org.springframework.data.repository.CrudRepository;

public interface PlaceRepository extends CrudRepository<Places, Integer> {


    Places findByPlaceId(Integer favoritePlaceId);
}
