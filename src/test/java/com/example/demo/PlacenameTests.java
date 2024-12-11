package com.example.demo;

import com.example.demo.models.DestinationType;
import com.example.demo.models.TravelerTypes;
import com.example.demo.models.entities.*;
import com.example.demo.models.repositories.*;
import com.example.demo.services.*;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.util.*;

// Testing crud operations for ExplorerHomepageService. Uses an in-memory database created just for the purpose of this test
@Import(TestConfig.class)
@DataJpaTest
@AutoConfigureTestDatabase (connection = EmbeddedDatabaseConnection.H2)
public class PlacenameTests {

    @Autowired
    PlaceRepository placeRepository;

    @Autowired
    PlacesService placesService;

    @Test
    public void TestPlacenameQueries() {

        // Set up places for placename queries test
        Places michigan = createPlace("Michigan", DestinationType.Misc);
        Places pennsylvania = createPlace("pennsylvania", DestinationType.Experiences);
        Places amherstHouseOfPizza = createPlace("Amherst House of Pizza", DestinationType.Dining);

        placeRepository.save(michigan);
        placeRepository.save(pennsylvania);
        placeRepository.save(amherstHouseOfPizza);

        // Test search by substring. In the case of all three places, passing an uppercase a should result in all
        // three places being returned.

        List<Places> placeNameSubstring1 = placesService.GetPlacesByPlacenameSubstring("A", 5, 1);

        Assertions.assertThat(placeNameSubstring1)
                .hasSize(3)
                .extracting(Places::getPlaceName)
                .containsExactly("Michigan", "pennsylvania", "Amherst House of Pizza");

        // Test search by substring with capital letter N, should only get Michigan and pennsylvania

        List<Places> placeNameSubstring2 = placesService.GetPlacesByPlacenameSubstring("N", 5, 1);

        Assertions.assertThat(placeNameSubstring2)
                .hasSize(2)
                .extracting(Places::getPlaceName)
                .containsExactly("Michigan", "pennsylvania");

        // Test search by substring which no locations have, should return a list of size 0.

        List<Places> placeNameSubstring3 = placesService.GetPlacesByPlacenameSubstring("no matching substring", 5, 1);

        Assertions.assertThat(placeNameSubstring3).isEmpty();
    }

    private Places createPlace(String placeName, DestinationType placeType) {
        Places place = new Places();
        place.setPlaceName(placeName);
        place.setPlaceType(placeType);
        return place;
    }
}
