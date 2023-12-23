package com.mero.animewatchlist.repository;

import com.mero.animewatchlist.model.AnimeList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimeListRepository extends JpaRepository<AnimeList, Integer> {

}