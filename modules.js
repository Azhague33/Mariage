exports.buildRecapTabForEmailHtml = function(data, title) {
    var output = '';
    const l = Object.keys(data).length;

    if(l != 0) {
        output += '<br/>';
        if(title != null) {
            output += '<strong style="display:block; padding-bottom:4px; opacity:0.3">' + title + '</strong>';
        }
        output += '<table style="color:rgb(53, 59, 54); background-color:rgb(250, 250, 250); border:1px rgb(210, 210, 210) solid; border-bottom:none; border-collapse:collapse; opacity:0.9; font-size:14px">';

        for(var i = 0; i < l; i++) {
            output += '<tr style="border-bottom:1px rgb(210, 210, 210) solid">';
                output += '<td valign="top" style="padding:4px 15px 4px 10px; border-right:1px rgb(210, 210, 210) solid">';
                    output += '<b style="font-size:11px; text-transform: uppercase;">' + data[Object.keys(data)[i]].label + '</b>';
                output += '</td>';
                output += '<td valign="top" style="padding:4px 10px">';
                    output += data[Object.keys(data)[i]].value;
                output += '</td>';
            output += '</tr>';
        }

        output += '</table>';
    }
    
    return output;
}
exports.buildEmailHtml = function(emailTxt, paramsList, companyData) {
    if(paramsList != null) {
        const l = Object.keys(paramsList).length;
        if(l != 0) {
            var regex = '';
            for(var i = 0; i < l; i++) {
                var regex = new RegExp('{' + Object.keys(paramsList)[i] + '}', 'g');
                emailTxt = emailTxt.replace(regex, paramsList[Object.keys(paramsList)[i]]);
            }
        }
    }

    return (
        '<html>'
            + '<div style="padding:50px 10px; background-color:rgb(79, 88, 80);">'
                + '<div style="display:block; margin:auto; max-width:650px; padding:50px 10px 50px 10px; background-color:white; box-shadow: 2px 2px 8px rgba(0, 0, 0, .35)">'
                    + '<div>'
                        + '<div style="display:block; margin:auto; max-width:550px; line-height:150%; font-size:14px; color:rgb(53, 59, 54); font-family:Lato, Calibri">'
                            + emailTxt
                            + '<br/>'
                            + '<br/>'
                            + '&Agrave; bientôt,'
                            + '<br/>Les Arroseurs'
                            + '<br/>'
                            + '<br/>'
                            + '<div style="line-height:120%">'
                                + '<br/><img src="https://s3.eu-west-3.amazonaws.com/les-arroseurs/les-arroseurs-logo-email-signature.png"/>'
                                + '<br/>'
                                + '<br/><a style="text-decoration:none; font-size:12px; color:rgb(24, 27, 25)" href="' + companyData.webSiteUrl + '" target="blank">' + companyData.webSite + '</a>'
                                + '<br/><span style="text-decoration:none; font-size:12px; color:rgb(24, 27, 25)">' + companyData.contact.email + ' <small>|</small> ' + companyData.contact.phone + '</span>'
                            + '</div>'
                        + '</div>'
                    + '</div>'
                + '</div>'
            + '</div>'
        + '</html>'
    );
}

exports.writeSiteMap = function(smStream, mainUrl, services, pagesUrls) {
    smStream.write({
        url: '/', changefreq: 'monthly', priority: 0.9,
        img: [
            {
                url: mainUrl + '/images/logo/les-arroseurs-logo-baseline-blanc.svg',
                caption: 'Le logo des Arroseurs, paysagiste à Bordeaux, Gironde.',
                title: 'Logo Les Arroseurs Paysagistes',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/index/paysagiste-bordeaux-gironde.jpg',
                caption: 'Paysagiste, ingénieurs en constructions extérieures et végétalisation à Bordeaux.',
                title: 'Paysagiste, professionnel du jardin à Bordeaux',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/jardin-paysagiste-chez-lin.jpg',
                caption: 'Regardez ce jardin, et bien le vôtre peut être aussi beau, reste à appeler Les Arroseurs.',
                title: 'Le jardin de chez Lin',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/jardin-paysage-chez-philippe.jpg',
                caption: 'Sûrement que tout le monde marche pieds nus sur cette belle allée.',
                title: 'L\'allée de chez philippe.',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/jardinier-amenagement-design.jpg',
                caption: 'Un aménagement d\'extérieur, un redesign de jardin, on imagine avec vous.',
                title: 'Jardinier aménagement design',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/entretien-jardin-bordeaux.jpg',
                caption: 'L\'entretien de votre jardin, ça passe par la taille d\'un arbre, la tonte d\'une pelouse et bien d\'autre.',
                title: 'Entretien de jardin à Bordeaux',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/massif-de-jardin.jpg',
                caption: 'Des massifs à thème et pleins de fleurs pour votre jardin.',
                title: 'Massif de jardin',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/terrase-en-bois-cumaru.jpg',
                caption: 'Une belle terrasse en bois pour vieillir aussi bien que le vin, c\'est posée dans les règles de l\'art.',
                title: 'Terrasse en bois cumaru',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/amenagement-bois.jpg',
                caption: 'Un beau potager bordé de bois massif, des bordures, une pergola ou du bardage, trouvent toujours leurs places dans un jardin.',
                title: 'Paysagiste aménagement bois',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/pelouse-gazon.jpg',
                caption: 'Une superbe pelouse installée en rouleau ou une pelouse semée pour un espace jardin davantage sauvage.',
                title: 'Paysagiste aménagement bois',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/arrosage-automatique-bordeaux.jpg',
                caption: 'Un arrosage qui s\'occupe seul de vos plantes et de votre pelouse, caché des yeux de tous. Une sorte de ninja du jardin quoi.',
                title: 'Arrosage automatique Bordeaux.jpg',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/vegetalisation-paysagisme.jpg',
                caption: 'Des plantes fleuries ou exotiques, feuillues ou à épines. De la qualité, de la proximité et de la diversité dans votre jardin.',
                title: 'Végétalisation Paysagisme',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/allee-minerale-gravier.jpg',
                caption: 'Vous en avez marre de marcher à même la terre, laissez nous vous fabriquez une belle allée ou une jolie terrasse en gravier tassé ou encore stabilisé.',
                title: 'Allée minérale et gravier',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/eclairage-jardin-bordeaux.jpg',
                caption: 'Un éclairage, fait juste pour votre extérieur, qui éclaire votre terrasse, votre allée, et illumine vos massifs.',
                title: 'Eclairage de jardin à Bordeaux',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/illustrations/naturel-paysage-jardin.png',
                caption: 'Que vous aimiez les jardin propres et pas trop encombrés ou bien la diversité, les jardins à l\'anglaise et bucoliques, nou sommes là pour répondre à vos ambitions.',
                title: 'Jardin naturel de paysagiste',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/illustrations/paysagiste-de-jardin-bordeaux.png',
                caption: 'On ne dit pas que votre jardin ne va pas vieillir mais qu\'il va bien vieillir.',
                title: 'Paysagiste de jardin à Bordeaux',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/travaux-paysage-artisanal.svg',
                caption: 'Bois, métaux, minéraux, nous n\'utilisons que des matériaux bruts, que nous taillons et travaillons pour un rendu uniques et sur-mesures de votre jardin.',
                title: 'Aménagement Paysagismes réalisés par nous',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/transparence-prix-paysagiste.svg',
                caption: 'Nos devis sont détaillés, nos prix  calculés au centime près et haque cdétail vous est communiqué. Parce que c\'est ce qu\'on aimerais pour nous aussi.',
                title: 'Transparence des prix paysagiste',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/garantie-jardinier-bordeaux.svg',
                caption: 'Un souci = un Arroseur dans votre jardin, parce que toutes nos prestations sont garanties 1 année.',
                title: 'Garantie des services de jardin',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/ecologie-jardin-paysage.svg',
                caption: 'Les bois que nous utilisons proviennent de forêts responsables. Les végétaux d\'une culture sans pesticides. Et oui, un beau jardin respectueux de l\'environnement c\'est terrible.',
                title: 'Aménagement de paysagisme écologiques',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/prix-paysagiste-gironde.svg',
                caption: 'C\'est parce qu\'on a très envie de vous montrer ce qu\'on a à vous proposer, que tous nos devis paysagisme sont gratuits.',
                title: 'Devis de paysagisme offerts',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/amenagment-jardin-materiaux-qualite.svg',
                caption: 'On vous propose le meilleur des matériaux pour le meilleur des jardin.',
                title: 'Aménagements de jardin de qualité',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/texture/grain.png',
                caption: 'Nos engagements, nos valeurs c\'est bien ce qui fait de nous de vrais professionnels de l\'arrosage et du paysagisme.',
                title: 'Valeurs et engagements',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/index/paysage-gironde.png',
                caption: 'On installe dans votre jardin, toutes les plantes qui vous souhaitez, on vous conseils et on vous accompagne dans votre réflexion d\'aménagement paysagé.',
                title: 'Des plantes dans votre jardin',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            }
        ]
    });
    smStream.write({url: pagesUrls.crm, changefreq: 'daily', priority: 0.7,
        img: [
            {
                url: mainUrl + '/images/crm/projets-paysagiste-bordeaux.jpg',
                caption: 'Outil de suivi de projet d\'arrosage ou de paysage à Bordeaux.',
                title: 'Projets Arrosage & Paysage Bordeaux',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            }
        ]
    });
    smStream.write({url: services.grass.mainPageUrl, changefreq: 'monthly', priority: 0.7,
        img: [
            {
                url: mainUrl + '/images/pelouse/gazon-pelouse-rustique.jpg',
                caption: 'Une belle pelouse rustique plantée dans votre jardin.',
                title: 'Pelouse rustique',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/pelouse/pelouse-gazon-ornement.jpg',
                caption: 'Une belle pelouse d\'ornement pour paysager votre jardin.',
                title: 'Pelouse d\'ornement',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/image/pelouse/gazon-pelouse-paquerette.jpg',
                caption: 'La pelouse de nos prairies, avec des herbes folles et des pâquerettes pour votre extérieur.',
                title: 'Pelouse avec paquerettes',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/image/pelouse/gazon-pelouse-kikuyu.jpg',
                caption: 'Un gazon qui est davantage une plante graminée traçante qu\'une herbacée. Idéal pour un paysagisme sauvage.',
                title: 'Pelouse kikuyu',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/image/pelouse/pelouse-entretenue-bordeaux',
                caption: 'Un peu d\'entretien et ma pelouse reste comme neuve.',
                title: 'L\'entretien de votre gazon',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/image/pelouse/pelouse-pas-entretenue-bordeaux.jpg',
                caption: 'De nouvelles herbes se sont invitées sur ma pelouse, ça fait plus sauvage et ça reste bien vert.',
                title: 'Pelouse non entretenue à Bordeaux',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/pelouse/jardin-pelouse-bordeaux.jpg',
                caption: 'Et oui, une belle pelouse, de qualité posée par des paysagistes professionnels et passionnés.',
                title: 'Pelouse et gazon posées par des paysagiste professionnel',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/pelouse/pelouse-gazon-bordeaux.jpg',
                caption: 'Un beau gazon qui fait rêver dans votre jardin.',
                title: 'Installation d\'un gazon de qualité sur bordeaux',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            }
        ]
    });
    smStream.write({url: services.woodenDeck.mainPageUrl, changefreq: 'monthly', priority: 0.7,
        img: [
            {
                url: mainUrl + '/images/terrasseEnBois/terrase-cumaru-bois.jpg',
                caption: 'De l\'ipé, du pin, du cumaru, peu importe les matériaux que vous choisirez, on sait que vous aurez une belle terrasse.',
                title: 'Terrasse en bois cumaru',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/terrasseEnBois/installateur-terasse-bois-bordeaux.svg',
                caption: 'Nous réalisons votre terrasse sur mesure, belle et durable. (Et c\'est mieux avec de bonnes bordures et de magnifiques plantes, non?).',
                title: 'Installateur terrasse en bois Bordeaux',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/terrasseEnBois/terrasse-en-ipe.jpg',
                caption: 'Un bois de première qualité et une couleur brune (qui tire très légèrement sur le rouge) qui reste stable dans le temps.',
                title: 'Terrasse en Ipé',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/terrasseEnBois/terrasse-en-cumaru.jpg',
                caption: 'Un bois que nous affectionnons particulièrement pour sa couleur rouge très design habille chaleureusement et fait voyager.',
                title: 'Terrasse en Cumaru',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/terrasseEnBois/terrasse-en-cumaru.jpg',
                caption: 'Bois très chic originaire d\'Asie, le Teck offre une belle couleur naturelle (chêne doré) et un veinage très intéressant, vous devriez voir ça.',
                title: 'Terrasse en Teck',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/terrasseEnBois/bois-pin-sylvestre-terrasse.jpg',
                caption: 'Un bois léger et peu onéreux pour un rendu naturel, à avoir dans son jardin.',
                title: 'Terrasse en Pin sylvestre',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/terrasseEnBois/pose-caillebotis-douglas.jpg',
                caption: 'Le douglas fournit un rendu très naturel et chaleureux grâce à sa couleur claire et son veinage prononcé.',
                title: 'Caillebotis en bois douglas',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/terrasseEnBois/terrasse-en-caillebotis-meleze.jpg',
                caption: 'Un bois résineux dont le niveau de qualité et la densité se positionnent entre l\'exotique et le pin, alors le pin pour votre terrasse et le douglas pour votre potager.',
                title: 'Terrasse en caillebotis mélèze',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/terrasseEnBois/terrasse-bordeaux-paysagiste.jpg',
                caption: 'Les terrasses en bois, c\'est fantastique, ça résiste à tout (sauf les tornades, ça tombe bien on en a pas chez nous)',
                title: 'Terrasse en bois résistante et durable',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            }
        ]
    });
    smStream.write({url: services.maintain.mainPageUrl, changefreq: 'monthly', priority: 0.7,
        img: [
            {
                url: mainUrl + '/images/entretien-de-jardin-paysagiste-bordeaux.jpg',
                caption: 'Confiez-nous l\'entretien de votre jardin, fermez le yeux, promis on fera pas de bêtise, on vous le rendra comme vous l\'attendiez.',
                title: 'Entretenir un jardin, ça Les Arroseurs savent faire',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/entretien-taille-jardin-bordeaux.svg',
                caption: 'Les Arroseurs peuvent tout entretenir, et en plus on aime les défis que votre jardin peut nous révéler.',
                title: '',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/entretien/entretien-taille-arbre-gironde.jpg',
                caption: 'Nous taillons vos arbres et arbustes avec expertise, savoir-faire et surtout avec plein d\'amour.',
                title: 'Taille d\'arbres et de plantes',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/entretien/entretien-de-jardin-paysagiste-bordeaux.jpg',
                caption: 'Ce qui est certain c\'est que nous taillons sur mesure votre haie pour que celle-ci soit élégante, bien structurée et harmonieuse avec le jardin et la maison.',
                title: 'Taille de haie',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/entretien/taille-paysagiste-bordeaux.jpg',
                caption: 'Savez-vous que certaines de vos plantes ont du potentiel graphique, malheureusement elles ne savent pas encore se tailler seules.',
                title: 'Taille design (palmier - conifère - arbuste)',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/entretien/entretien-pelouse-tonte-gazon.jpg',
                caption: '8 cm en été, 6 cm le reste de l\'année, nous tondons votre pelouse, pour un jardin propre et soigné.',
                title: 'Entretien : tonte de pelouses',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/entretien/evacuation-dechets-jardin-gironde.jpg',
                caption: 'Peu importe la quantité, peu importe les épines, nous ramassons et évacuons en déchèterie vos déchets de jardin. (Ne vous en faites pas on à des gants de vrais jardiniers).',
                title: 'Évacuation déchets de jardin',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/entretien/entretien-de-jardin-paysagiste-bordeaux.jpg',
                caption: 'Nous nettoyons votre jardin pour un résultat impeccable, c\'est garantie main d\'experts et parole d\'Arroseurs.',
                title: 'Nettoyage de jardin',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/entretien/taille-entretien-conifere-avant.jpg',
                caption: 'Un conifère pas taillé c\'est tout fou, et ça prend de la place dans le jardin.',
                title: 'Conifère taillé en nuage - avant',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/entretien/taille-entretien-conifere-apres.jpg',
                caption: 'Il respire bien la. tout content d\'être taillé et d\'être le plus beau du jardin.',
                title: 'Conifère taillé en nuage - après',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/entretien/phoenix-taille-ananas-avant.jpg',
                caption: 'Un Phoenix pas taillé est oublié par rapport aux autres plantes, laissez le montrer toute sa splendeur.',
                title: 'Phoenix taillé en ananas - avant',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/entretien/phoenix-taille-ananas-apres.jpg',
                caption: 'Avoir un Phoenix dans son jardin ça fait peut-être penser à un ananas mais ça nous améne surtout l\'été.',
                title: 'Phoenix taillé en ananas - après',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/entretien/entretien-taille-haie-avant.jpg',
                caption: 'Pas besoin d\'avoir une haie touffue pour bien se cacher de ses voisins lorsqu\'on est dans son jardin.',
                title: 'Haie de leylandii taillée droite - avant',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/entretien/entretien-taille-haie-apres.jpg',
                caption: 'Une haie bien taillée c\'est au poile et au carrée et ça, on aime.',
                title: 'Haie de leylandii taillée droites - après',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/entretien/jardinier-paysagiste-gironde.jpg',
                caption: 'Une haie bien taillée c\'est comme une nouvelle coupe de cheveux, ça se voit toute suite.',
                title: 'Une jolie haie, c\'est une haie bien entretenue',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            }
        ]
    });
    smStream.write({url: pagesUrls.contact, changefreq: 'monthly', priority: 0.7,
        img: [
            {
                url: mainUrl + '/images/contact/les-arroseurs-paysagiste-bordeaux.jpg',
                caption: 'Pour un beau projet avec Les Arroseurs, il faut prendre contact.',
                title: 'Contact Les Arroseurs',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/contact/contact-jardin-bordeaux.png',
                caption: 'On attend vos idées, pour construire ensemble vos projets paysagés, reste à nous contacter.',
                title: 'Des idées, des projets',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/contact/jardin-paysage-gironde.png',
                caption: 'On imagine dans votre jardin de jolies fleurs, on vous conseils et on vous accompagne dans votre réflexion d\'aménagement paysagé.',
                title: 'Des fleurs dans votre jardin',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            }
        ]
    });
    smStream.write({url: pagesUrls.bordeaux, changefreq: 'monthly', priority: 0.6,
        img: [
            {
                url: mainUrl + '/images/logo/les-arroseurs-logo-complet-bleu.svg',
                caption: 'Les Arroseurs, équipe de paysagiste intervenant dans Bordeaux et sa métropole.',
                title: 'Logo complet Les Arroseurs Paysagiste',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            }
        ]
    });
    smStream.write({url: pagesUrls.termsOfUse, changefreq: 'monthly', priority: 0.5,
        img: [
            {
                url: mainUrl + '/images/logo/les-arroseurs-logo-complet-noir.svg',
                caption: 'Les Arroseurs c\'est avant tout une équipe de passionnés du jardinage, du paysage et de l\'arrosage.',
                title: 'Logo complet Les Arroseurs',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/logo/les-arroseurs-logo-noir.svg',
                caption: 'Les Arroseurs c\'est une jeune société avec beaucoup d\'ambition et de volonté.',
                title: 'Logo Les Arroseurs',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            },
            {
                url: mainUrl + '/images/contact/jardin-paysage-gironde.png',
                caption: 'On imagine dans votre jardin de jolies fleurs, on vous conseils et on vous accompagne dans votre réflexion d\'aménagement paysagé.',
                title: 'Des fleurs dans votre jardin',
                geoLocation: 'Bordeaux, France',
                license_temp_off: 'Les Arroseurs'
            }
        ]
    });
    smStream.end();
}
