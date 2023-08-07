package fa.traning.backEnd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import fa.traning.backEnd.model.Users;
import fa.traning.backEnd.reponsitory.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private UserRepository userRepo;

	@GetMapping
	public List<Users> showListUsers() {
		return userRepo.findAll();
	}
	@GetMapping("/{id}")
	public ResponseEntity<?> getUserById(@PathVariable int id){
		Users user = userRepo.findById(id).get();
		return ResponseEntity.ok(user);
	}

	@PostMapping("/addUser")
	public ResponseEntity<?> addUser(@RequestBody Users user) { 
		Users userDB = userRepo.findByUsername(user.getUsername());
		if (userDB == null) {
			Users userSetter = new Users();
			userSetter.setUsername(user.getUsername());
			userSetter.setPassword(user.getPassword());
			userSetter.setFullName(user.getFullName());
			userSetter.setRole("customer");
			Users savedUser = userRepo.save(userSetter);
			return ResponseEntity.ok("addSuccess");
		}

		return ResponseEntity.ok().body("Duplicate Username");
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Users user) {
		Users userDB = userRepo.findByUsername(user.getUsername());
		
		if (userDB == null || !userDB.getPassword().equals(user.getPassword())) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(userDB.getUserId());
	}
	@GetMapping("/getUser/{id}")
	public ResponseEntity<?> getUser(@PathVariable int id){
		Users user = userRepo.findByUserId(id).get();
		
		
		return ResponseEntity.ok(user);
	}
	@DeleteMapping("/delete/{id}")
	public void deleteUser(@PathVariable int id) {
		userRepo.deleteById(id);
	}
}
