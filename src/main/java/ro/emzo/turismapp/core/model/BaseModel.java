package ro.emzo.turismapp.core.model;

import javax.persistence.*;

@MappedSuperclass
public abstract class BaseModel implements java.io.Serializable {

	private static final long serialVersionUID = -8596858036109730303L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private Long id;

	public BaseModel() {
        super();
    }
	
	public BaseModel(final Long id) {
        super();
        this.id = id;
    }
	
	public Long getId() {
		return id;
	}
	
	public void setId(final Long id) {
		this.id = id;
	}
}
