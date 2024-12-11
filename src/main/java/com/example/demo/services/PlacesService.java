package com.example.demo.services;

import com.example.demo.models.DestinationType;
import com.example.demo.models.entities.Places;
import com.example.demo.models.repositories.PlaceRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlacesService {

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    PlaceRepository placeRepository;

    @Transactional
    public List<Places> GetPlacesByPlacenameSubstring(String placename, int resultsLimit, int page) {
        // Gets places by lowercase variation of a substring of the placename, orders by length to assure
        // all places can show up
        String hql =
                "FROM Places places " +
                        "WHERE LOWER(places.placeName) LIKE LOWER(:placename) ORDER BY LENGTH(places.placeName) ASC";

        int skip = (page - 1) * resultsLimit;

        List<Places> places = entityManager.createQuery(hql, Places.class).setParameter("placename", "%" + placename + "%").setFirstResult(skip).setMaxResults(resultsLimit).getResultList();

        return places;
    }
}
