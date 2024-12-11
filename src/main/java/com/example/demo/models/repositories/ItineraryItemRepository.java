package com.example.demo.models.repositories;

import com.example.demo.models.entities.ItineraryItem;
import com.example.demo.models.entities.ItineraryReferenceTable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
// repository which allows for HQL-less queries to be executed automatically
public interface ItineraryItemRepository extends CrudRepository<ItineraryItem, Integer> {

    List<ItineraryItem> findAllByItineraryReferenceIdOrderByTimeItemAtAsc(ItineraryReferenceTable itimeraryReference);

    ItineraryItem findByItineraryItemId(int itemId);
}
