package com.example.storage.ecchi.service.imp;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.storage.ecchi.model.SauceTypeModel;
import com.example.storage.ecchi.repository.SauceTypeRepository;
import com.example.storage.ecchi.service.SauceTypeService;
import com.example.storage.ecchi.transformation.SauceTypeTransformer;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SauceTypeServiceImp implements SauceTypeService{
	
	private final SauceTypeRepository repository;
	
	private final SauceTypeTransformer transformer;
	
	@Override
	public List<SauceTypeModel> getAllSauceType() {
		return transformer.applyList(repository.findAll());
	}

}
