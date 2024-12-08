package com.example.demo.models.repositories;

import com.example.demo.models.entities.ItineraryReferenceTable;
import com.example.demo.models.entities.Users;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ItineraryReferenceTableRepository extends CrudRepository<ItineraryReferenceTable, Integer> {

    public ItineraryReferenceTable findByItineraryId(Integer itineraryId);

    public List<ItineraryReferenceTable> findAllByUserForItineraryOrderByItineraryTimestampDesc(Users user);
}
