package com.example.demo.services;

import com.example.demo.models.entities.Places;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlacesService {

    @Autowired
    EntityManager entityManager;

    @Transactional
    public List<Places> GetPlacesByPlacenameSubstring(String placename, int resultsLimit, int page) {
        String hql =
                "FROM Places places " +
                        "WHERE LOWER(places.placeName) LIKE :placename ORDER BY places.placeName ASC";

        int skip = (page - 1) * resultsLimit;

        List<Places> places = entityManager.createQuery(hql, Places.class).setParameter("placename", "%" + placename + "%").setFirstResult(skip).setMaxResults(resultsLimit).getResultList();

        return places;
    }
}
