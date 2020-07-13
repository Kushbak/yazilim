<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $telNum;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $faculty;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $department;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Posters", mappedBy="user")
     */
    private $posters;

    public function __construct()
    {
        $this->posters = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getTelNum(): ?string
    {
        return $this->telNum;
    }

    public function setTelNum(string $telNum): self
    {
        $this->telNum = $telNum;

        return $this;
    }

    public function getFaculty(): ?string
    {
        return $this->faculty;
    }

    public function setFaculty(string $faculty): self
    {
        $this->faculty = $faculty;

        return $this;
    }

    public function getDepartment(): ?string
    {
        return $this->department;
    }

    public function setDepartment(string $department): self
    {
        $this->department = $department;

        return $this;
    }

    /**
     * @return Collection|Posters[]
     */
    public function getPosters(): Collection
    {
        return $this->posters;
    }

    public function addPoster(Posters $poster): self
    {
        if (!$this->posters->contains($poster)) {
            $this->posters[] = $poster;
            $poster->setUser($this);
        }

        return $this;
    }

    public function removePoster(Posters $poster): self
    {
        if ($this->posters->contains($poster)) {
            $this->posters->removeElement($poster);
            // set the owning side to null (unless already changed)
            if ($poster->getUser() === $this) {
                $poster->setUser(null);
            }
        }

        return $this;
    }
}
