package com.example.demo.models.repositories;

import com.example.demo.models.entities.ItineraryReferenceTable;
import com.example.demo.models.entities.Users;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
// repository which allows for HQL-less queries to be executed automatically
public interface ItineraryReferenceTableRepository extends CrudRepository<ItineraryReferenceTable, Integer> {

    public ItineraryReferenceTable findByItineraryId(Integer itineraryId);

    public List<ItineraryReferenceTable> findAllByUserForItineraryOrderByItineraryTimestampDesc(Users user);
}
