package fa.traning.backEnd.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fa.traning.backEnd.model.Products;
import fa.traning.backEnd.reponsitory.ProductRepository;


@RestController
@RequestMapping("/api/products")
public class ProductController {

	@Autowired
	private ProductRepository productRepo;

	@GetMapping("/")
	public List<Products> getAllProducts() {
		return productRepo.findAll();
	}
	
	@GetMapping("/productDetail/{id}")
	public ResponseEntity<Products> getProductDetail(@PathVariable int id){
		Products product = productRepo.findById(id).get();
		
		return ResponseEntity.ok(product);
	}

	@PostMapping("/add")
	public ResponseEntity<Products> addProduct(@RequestParam("file") MultipartFile file,
			@RequestParam("productName") String productName, @RequestParam("price") double price,
			@RequestParam("ingredient") String ingredient, @RequestParam("decription") String decription)
			throws IOException {
		byte[] imageData = file.getBytes();

		String fileName = file.getOriginalFilename();
		Path path = Paths.get("src/main/resources/images/" + fileName);
		Files.write(path, imageData);

		Products product = new Products();
		product.setProductName(productName);
		product.setPrice(price);
		product.setIngredient(ingredient);
		product.setDecription(decription);
		product.setImage(fileName);

		Products savedProduct = productRepo.save(product);

		return ResponseEntity.ok(savedProduct);

	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<Products> updateProduct(@RequestParam("file") MultipartFile file,
			@RequestParam("productName") String productName, @RequestParam("price") double price,
			@RequestParam("ingredient") String ingredient, @RequestParam("decription") String decription,@PathVariable int id) throws IOException{
		Products existingProduct = productRepo.findById(id).orElse(null);
		if(existingProduct ==null) {
			return ResponseEntity.notFound().build();
		}
		byte[] imageData = file.getBytes();

		String fileName = file.getOriginalFilename();
		Path path = Paths.get("src/main/resources/images/" + fileName);
		Files.write(path, imageData);
		existingProduct.setProductName(productName);
		existingProduct.setPrice(price);
		existingProduct.setDecription(decription);
		existingProduct.setIngredient(ingredient);
		existingProduct.setImage(fileName);
		
        Products savedProduct = productRepo.save(existingProduct);

		
		return ResponseEntity.ok(savedProduct);
		
	}
	
	@GetMapping(path = "/get-image/{image}")
	public ResponseEntity<ByteArrayResource> getImage(@PathVariable ("image") String image){
		if(image != null || "".equals(image)) {
			Path fileName = Paths.get("src/main/resources/images/",image);
			try {
				byte[] buffer = Files.readAllBytes(fileName);
				ByteArrayResource bytes = new ByteArrayResource(buffer);
				return ResponseEntity.ok().contentLength(buffer.length)
						.contentType(MediaType.parseMediaType("image/png")).body(bytes);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return ResponseEntity.badRequest().build();
	}

	@DeleteMapping("/{id}")
	public void deleteProduct(@PathVariable int id) {
		productRepo.deleteById(id);

	}
}
