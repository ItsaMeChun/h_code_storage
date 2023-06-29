package com.example.storage.ecchi.service.imp;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.storage.ecchi.model.SauceHistoryModel;
import com.example.storage.ecchi.model.TotalSauceHistory;
import com.example.storage.ecchi.repository.SauceHistoryRepository;
import com.example.storage.ecchi.service.SauceHistoryService;
import com.example.storage.ecchi.transformation.SauceHistoryTransformer;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SauceHistoryServiceImp implements SauceHistoryService{

	private final SauceHistoryRepository repository;
	
	private final SauceHistoryTransformer transformer;
	
	@Override
	public List<SauceHistoryModel> getAllSauceHistory() {
		return transformer.applyList(repository.findAll());
	}

	@Override
	public List<TotalSauceHistory> getSauceHistory(String year, String extractDate) {
		return repository.countSauceHistory(year, extractDate);
	}
}
