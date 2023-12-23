package com.mero.animewatchlist.controller;


import com.mero.animewatchlist.model.AnimeList;
import com.mero.animewatchlist.repository.AnimeListRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/animelist") //how to reach this controller
@CrossOrigin(origins = "http://localhost:3000") //allow requests from this origin
public class AnimeListController {

    private final AnimeListRepository repository;

    public AnimeListController(AnimeListRepository repository) {
        this.repository = repository;
    }

    //make a request and find all the pieces of content on the system
    @GetMapping("") //handle the get request
    public List<AnimeList> findAll() {
        return repository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @GetMapping("/{id}")
    public AnimeList findById(@PathVariable Integer id) {
        return repository.findById(id)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "AnimeList not found"));
    }


    //CREATE
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    public void create(@Valid @RequestBody AnimeList animeList) {
        repository.save(animeList);
    }

    //UPDATE
    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping("/{id}")
    public void update(@Valid @RequestBody AnimeList animeList, @PathVariable Integer id) {
        if(!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "AnimeList not found thus cannot be updated");
        }
        repository.save(animeList);
    }

    //DELETE
    @CrossOrigin
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        if(!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "AnimeList not found thus cannot be deleted");
        }
        repository.deleteById(id);
    }
}