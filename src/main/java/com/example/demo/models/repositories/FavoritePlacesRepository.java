package com.example.demo.models.repositories;

import com.example.demo.models.entities.FavoriteDestinations;
import com.example.demo.models.entities.Places;
import org.springframework.data.repository.CrudRepository;

public interface FavoritePlacesRepository extends CrudRepository<FavoriteDestinations, Integer> {
}
